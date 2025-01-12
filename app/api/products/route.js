import fs from "fs/promises";
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import connectToDatabase from "@/lib/mongodb";
import { Product } from "@/models";
import { v2 as cloudinary } from "cloudinary";

export const dynamic = "force-dynamic";

// Helper function to attempt file deletion with retries
const tryDeleteFile = async (filePath, retries = 3, delay = 1000) => {
  try {
    await fs.unlink(filePath); // Attempt to delete the file
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying file deletion for ${filePath}...`);
      await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
      await tryDeleteFile(filePath, retries - 1, delay); // Retry deletion
    } else {
      console.error(`Failed to delete file: ${filePath}`, error);
    }
  }
};

export async function POST(request) {
  try {
    await connectToDatabase();

    const formData = await request.formData();
    const title = formData.get("title");
    const imageFile = formData.get("image");

    if (!title || !imageFile) {
      return NextResponse.json(
        { success: false, message: "Title and image are required." },
        { status: 400 }
      );
    }

    const uploadedImage = await uploadToCloudinary(imageFile);

    // Save product details to the database
    const product = new Product({
      title,
      image: uploadedImage.secure_url, // Public URL of the uploaded file
    });
    await product.save();

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/products:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET - Fetch all products
export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find();
    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/products:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete a product
export async function DELETE(request) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, // Your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // Your Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API secret
  });
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    const publicId = deletedProduct.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`Glamour/${publicId}`);

    return NextResponse.json(
      { success: true, message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE /api/products:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
