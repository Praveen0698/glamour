import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Gallery } from "@/models";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { v2 as cloudinary } from "cloudinary";

export const dynamic = "force-dynamic";

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

    const uploadedImage = await uploadToCloudinary(imageFile);

    const gallery = new Gallery({ image: uploadedImage.secure_url });
    await gallery.save();

    return NextResponse.json({ success: true, data: gallery }, { status: 201 });
  } catch (error) {
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
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete a gallery image
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

    const deletedGallery = await Gallery.findByIdAndDelete(id);
    if (!deletedGallery) {
      return NextResponse.json(
        { success: false, message: "Image not found" },
        { status: 404 }
      );
    }

    const publicId = deletedGallery.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`Glamour/${publicId}`);
    return NextResponse.json(
      { success: true, message: "Gallery image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
