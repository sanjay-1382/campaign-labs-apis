// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
// const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3"); // Import GetObjectCommand

// // Create an S3 client instance
// const s3Client = new S3Client({
//   endpoint: "https://nyc3.digitaloceanspaces.com",
//   forcePathStyle: false,
//   region: "us-east-1", // Replace with the appropriate region for your Space
//   credentials: {
//     accessKeyId: process.env.CL_API_DIGITALOCEAN_SPACES_KEY,
//     secretAccessKey: process.env.CL_API_DIGITALOCEAN_SPACES_SECRET
//   }
// });

// // Function to get the URL of an uploaded image
// const getImageUrl = async (bucketName, imagePath) => {
//   try {
//     const params = {
//       Bucket: bucketName,
//       Key: imagePath,
//       Expires: 3600 // URL expiration time in seconds (adjust as needed)
//     };

//     const url = await getSignedUrl(s3Client, new GetObjectCommand(params));
//     return url;
//   } catch (error) {
//     console.error("Error getting image URL:", error);
//     throw error;
//   }
// };

// // Specify the bucket name and image path
// const bucketName = "example-space"; // Replace with your DigitalOcean Spaces bucket name
// const imagePath = "folder-path/image.jpg"; // Replace with the path to your uploaded image

// // Call the function to get the image URL
// getImageUrl(bucketName, imagePath)
//   .then((url) => {
//     console.log("Image URL:", url);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

import fs from "fs";
import path from "path";
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// Create an S3 client instance
const s3Client = new S3Client({
  endpoint: "https://nyc3.digitaloceanspaces.com",
  forcePathStyle: true,
  region: "us-east-1", // Replace with your Spaces region
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
      Body: fileContent
    };

    const data = await s3Client.send(new PutObjectCommand(params));
    console.log("Image uploaded successfully:", data);
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

// Specify the path to the image file
const imagePath = "/path/to/image.jpg"; // Replace with the path to your image file

// Specify the bucket name and key (path) to upload the image to
const bucketName = "example-bucket"; // Replace with your bucket name
const key = "images/image.jpg"; // Replace with the key (path) to upload the image to

// Call the function to upload the image
uploadImage(imagePath, bucketName, key);
