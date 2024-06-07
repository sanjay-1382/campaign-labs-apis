const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client } = require("@aws-sdk/client-s3");

// Create an S3 client instance
const s3Client = new S3Client({
  endpoint: "https://nyc3.digitaloceanspaces.com",
  forcePathStyle: false,
  region: "us-east-1", // Replace with the appropriate region for your Space
  credentials: {
    accessKeyId: process.env.CL_API_DIGITALOCEAN_SPACES_KEY,
    secretAccessKey: process.env.CL_API_DIGITALOCEAN_SPACES_SECRET
  }
});

// Function to get the URL of an uploaded image
const getImageUrl = async (bucketName, imagePath) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: imagePath,
      Expires: 3600 // URL expiration time in seconds (adjust as needed)
    };

    const url = await getSignedUrl(s3Client, new GetObjectCommand(params));
    return url;
  } catch (error) {
    console.error("Error getting image URL:", error);
    throw error;
  }
};

// Specify the bucket name and image path
const bucketName = "example-space"; // Replace with your DigitalOcean Spaces bucket name
const imagePath = "folder-path/image.jpg"; // Replace with the path to your uploaded image

// Call the function to get the image URL
getImageUrl(bucketName, imagePath)
  .then((url) => {
    console.log("Image URL:", url);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
