import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import os from "os";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, // Your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API secret
});

const uploadToCloudinary = async (file) => {
  try {
    // Check if the file exists
    if (!file) {
      throw new Error("No file provided for upload.");
    }

    // Generate a temporary file path
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, `${Date.now()}-${file.name}`);

    // Convert ArrayBuffer to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Save the file to the temporary location
    await fs.writeFile(tempFilePath, buffer);

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(tempFilePath, {
      resource_type: "auto", // Automatically detect the file type
      folder: "Glamour", // Replace with your folder name
      timeout: 30000,
    });

    // Remove the temporary file
    await fs.unlink(tempFilePath);

    return response;
  } catch (error) {
    // Enhanced error logging with full error details
    console.error("Error uploading file to Cloudinary:", error);
    console.error("Error stack trace:", error.stack);
    return null;
  }
};

export { uploadToCloudinary };
