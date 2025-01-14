import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Gallery } from "@/models";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

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
const uploadToS3 = async (file, folder = "gallery") => {
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
const deleteFromS3 = async (fileKey) => {
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

// POST - Add a new gallery image
export async function POST(request) {
  try {
    await connectToDatabase();

    const formData = await request.formData();
    const imageFile = formData.get("image");

    if (!imageFile) {
      return NextResponse.json(
        { success: false, message: "Image is required." },
        { status: 400 }
      );
    }

    const uploadedImageUrl = await uploadToS3(imageFile, "gallery");

    const gallery = new Gallery({ image: uploadedImageUrl });
    await gallery.save();

    return NextResponse.json({ success: true, data: gallery }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/gallery:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET - Fetch all gallery images
export async function GET() {
  try {
    await connectToDatabase();
    const gallery = await Gallery.find();
    return NextResponse.json({ success: true, data: gallery }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/gallery:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete a gallery image
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

    const deletedGallery = await Gallery.findByIdAndDelete(id);
    if (!deletedGallery) {
      return NextResponse.json(
        { success: false, message: "Image not found" },
        { status: 404 }
      );
    }

    // Extract file key from S3 URL
    const fileKey = new URL(deletedGallery.image).pathname.substring(1);
    await deleteFromS3(fileKey);

    return NextResponse.json(
      { success: true, message: "Gallery image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE /api/gallery:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
