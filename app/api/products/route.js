import { NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import connectToDatabase from "@/lib/mongodb";
import { Product } from "@/models";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

export const dynamic = "force-dynamic";

// Helper function to upload a file to S3
const uploadToS3 = async (file, folder = "uploads") => {
  try {
    const fileKey = `${folder}/${Date.now()}-${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadParams = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: fileKey,
      Body: buffer,
      ContentType: file.type,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    // Return the public URL of the uploaded file
    return `https://${AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Failed to upload file to S3.");
  }
};

// Helper function to delete an S3 object
const deleteS3Object = async (fileKey) => {
  try {
    const deleteParams = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: fileKey,
    };

    await s3.send(new DeleteObjectCommand(deleteParams));
  } catch (error) {
    console.error(`Error deleting ${fileKey} from S3:`, error);
    throw new Error(`Failed to delete ${fileKey} from S3.`);
  }
};

// POST - Add a new product
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

    const productFileUrl = await uploadToS3(imageFile, "products");

    // Save product details to the database
    const product = new Product({
      title,
      image: productFileUrl, // Public URL of the uploaded file
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

    // Extract file key from S3 URL
    const fileKey = deletedProduct.image.split(".amazonaws.com/").pop();

    // Delete the file from S3
    await deleteS3Object(fileKey);

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
