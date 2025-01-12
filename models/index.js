import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  image: String,
  title: String,
});

const GallerySchema = new mongoose.Schema({
  image: String,
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export const Gallery =
  mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
