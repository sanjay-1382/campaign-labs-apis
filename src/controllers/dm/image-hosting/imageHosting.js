import { executeQuery } from "../../helpers/mysql/mysqlConnection.js";
import logger from "../../Logger/logger.js";

import imageHostingSchema from "../../models/imageHosting/imageHosting.js";
import { formatDate } from "../../helpers/commonFunction.js";
import multer from "multer";
import path from "path";
// import sharp from "sharp";
import fs from "fs";
import axios from "axios";
import { json } from "body-parser";

const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

require("dotenv").config();

// Configure Multer for file upload
const imageDir = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "volume",
  "templateImages"
);
// path.join(__dirname, "", "volume", "templateImages");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      path.basename(file.originalname, path.extname(file.originalname)) +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage,
  // limits: { fileSize: 2 * 1024 * 1024 }, // 2MB file size limit
  fileFilter: (req, file, cb) => {
    const filetypes = /gif|GIF|jpg|JPG|jpeg|JPEG|png|PNG/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(null, false);
    }
  }
}).array("images");

export async function imgUploads(req, res) {
  try {
    upload(req, res, async (err) => {
      // console.log(req);
      const { created_by, created_by_name } = req.body;
      if (err) {
        res.status(400).json({ error: err });
      } else {
        if (!req.files || req.files.length === 0) {
          res.status(400).json({ message: "No files uploaded" });
        } else {
          const images = [];
          try {
            for (const file of req.files) {
              const filenameWithoutExt =
                path.basename(
                  file.originalname,
                  path.extname(file.originalname)
                ) +
                "-" +
                Date.now();

              const filename = file.filename;

              const thumbnailFilename = `${filenameWithoutExt}-thumbnail${path.extname(
                file.originalname
              )}`;

              // Check file extension
              const allowedExtensions = [
                ".gif",
                ".GIF",
                ".jpg",
                ".JPG",
                ".jpeg",
                ".JPEG",
                ".png",
                ".PNG"
              ];
              if (
                !allowedExtensions.includes(
                  path.extname(file.originalname).toLowerCase()
                )
              ) {
                throw new Error("Invalid file extension");
              }
              // Check file size
              if (file.size > 2 * 1024 * 1024) {
                console.log("this file is more than 2 MB");
                fs.unlinkSync(file.path);
                continue;
              }

              // Specify the path to the image file
              const imagePath = file.path; // Replace with the path to your image file

              // Specify the bucket name and key (path) to upload the image to
              const bucketName = process.env.CL_API_DIGITALOCEAN_BUCKETNAME; // Replace with your bucket name
              const key =
                process.env.CL_API_DIGITALOCEAN_KEY_PATH + "/" + filename; // Replace with the key (path) to upload the image to

              // Call the function to upload the image
              const uploadImageUrl = await uploadImage(
                imagePath,
                bucketName,
                key
              );

              const newImage = new imageHostingSchema({
                imageName: uploadImageUrl.url,
                imageETag: uploadImageUrl.id,
                createdBy: created_by,
                createdByName: created_by_name
              });
              // console.log("uploadImageUrl", uploadImageUrl);
              await newImage.save();
              images.push(newImage);
            }
            res.status(200).json({
              message: "Files uploaded successfully",
              data: {
                imagePath: images.map((item) => {
                  return item.imageName;
                })
              }
            });
          } catch (error) {
            console.error("Error executing query:", error);
            logger.error(`This error in imgUploads part ${error}`);
            res.status(500).json({
              message: "Error saving file details to MongoDB"
            });
          }
        }
      }
    });
  } catch (error) {
    console.log("imgUpload", error);
  }
}

export async function deleteImgUploads() {
  try {
    // Delete all documents from the collection
    await imageHostingSchema.deleteMany({});
    console.log("All documents deleted successfully.");
  } catch (error) {
    console.error("Error deleting documents:", error);
  }
}

// Create an S3 client instance
const s3Client = new S3Client({
  endpoint: process.env.CL_API_DIGITALOCEAN_ENDPOINT,
  forcePathStyle: true,
  region: process.env.CL_API_DIGITALOCEAN_REGION, // Replace with your Spaces region
  credentials: {
    accessKeyId: process.env.CL_API_DIGITALOCEAN_SPACES_KEY,
    secretAccessKey: process.env.CL_API_DIGITALOCEAN_SPACES_SECRET
  }
});

// Function to upload an image to DigitalOcean Spaces
const uploadImage = async (filePath, bucketName, key) => {
  try {
    // Read the image file
    const fileContent = fs.readFileSync(filePath);

    // Upload the image to Spaces
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: fileContent,
      ACL: "public-read",
      // ContentType: file.mimetype
      Metadata: {
        // Defines metadata tags.
        "x-amz-acl": "public-read"
      }
    };

    const data = await s3Client.send(new PutObjectCommand(params));
    // console.log("Image uploaded successfully:", data);
    const s3ClientImgUrl = `${process.env.CL_API_DIGITALOCEAN_ENDPOINT}/${params.Bucket}/${params.Key}`;
    return {
      id: data.ETag,
      url: s3ClientImgUrl
    };
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

// Function to delete an image from DigitalOcean Spaces
const deleteImage = async (bucketName, filePath) => {
  try {
    // Define the parameters for the deleteObject operation
    const params = {
      Bucket: bucketName,
      Key: filePath // Specify the key of the image you want to delete
    };

    // Call the deleteObject operation
    const data = await s3Client.send(new DeleteObjectCommand(params));
    // console.log("Image deleted:", data);
  } catch (error) {
    console.error("Error deleted image:", error);
  }
};

/****************************************************** */
export async function getAllUploadsImages(req, res, next) {
  try {
    const allBounce = await imageHostingSchema
      .find({
        actions: { $in: ["Active", "InActive"] },
        active: { $in: [1, 0] }
      })
      .sort({ updatedAt: -1 });
    let dummy = allBounce;
    const formattedData = dummy.map((item) => ({
      id: item._id,
      createdAt1: formatDate(item.createdAt),
      createdByName1: item.createdByName,
      updatedAt1: formatDate(item.updatedAt),
      updatedByName1: item.updatedByName,
      url: item.imageName
    }));

    return res.status(200).json({
      message: "Success",
      result: formattedData
    });
  } catch (error) {
    console.log(error);
    logger.error(
      `Error occured getAllBounce in bounce treatment${error.message}`
    );
    return res.status(500).json({
      message: "Error occured while fetching the images"
    });
  }
}

export async function deleteById(req, res, next) {
  console.log("imageHosting:", req.params.id);
  const imageHostingId = req.params.id;
  let imageHosting;
  try {
    imageHosting = await imageHostingSchema.findById(imageHostingId);
    // console.log("imageHosting:", imageHosting);
  } catch (err) {
    logger.error(`This error in deleteById part ${err}`);
    res.status(500).json({
      message:
        "Something went wrong ,This Image is not found in bucket for delete.",
      code: 500
    });
  }

  let deleteData;
  try {
    const updatedDocument = await imageHostingSchema.findByIdAndUpdate(
      imageHostingId,
      { actions: "Deleted", active: 2 },
      { new: true }
    );
    // console.log("Updated document:", updatedDocument);
    /************************************************* */
    const bucketName = process.env.CL_API_DIGITALOCEAN_BUCKETNAME; // Replace with your bucket name
    const filename = imageHosting.imageName.match(/\/([^/]+)$/)[1];
    const key = process.env.CL_API_DIGITALOCEAN_KEY_PATH + "/" + filename; // Replace with the key (path) to upload the image to

    // Call the function to delete the image
    const uploadImageUrl = await deleteImage(bucketName, key);
    /************************************************* */
    res.status(200).json({
      message: "ImageHosting deleted successfully.",
      code: 200
    });
  } catch (error) {
    console.error("Error updating document:", error);
    logger.error(`This error in deleteById part ${error}`);
  }
}
