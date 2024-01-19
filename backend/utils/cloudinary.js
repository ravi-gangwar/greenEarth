import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import path from "path";
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    // Remove the locally saved temporary file
    await fs.unlink(localFilePath);

    return response;
  } catch (error) {
    // Handle errors
    console.error("Error during Cloudinary upload:", error.message);

    // Remove the locally saved temporary file in case of an error
    await fs.unlink(localFilePath);

    return null;
  }
};

export { uploadOnCloudinary };
