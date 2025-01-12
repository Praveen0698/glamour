"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

interface GalleryItem {
  _id: string;
  image: string;
}

const Gallery = () => {
  const [getGalleryData, setGetGalleryData] = useState<GalleryItem[]>([]);

  const getGallery = async () => {
    try {
      const response = await axios.get("/api/gallery");
      setGetGalleryData(response.data.data);
    } catch (error) {
      console.error("Error fetching gallery data:", error);
      return []; // Return empty array on error
    }
  };

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <section id="gallery" className="py-10 px-6 sm:px-10 lg:px-20 text-center">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6">
        GALLERY
      </h1>
      <div className="flex gap-4 overflow-x-auto my-scroll-container h-64 md:h-72 lg:h-80 ">
        {getGalleryData.map((image, index) => (
          <div
            key={index}
            className="w-[200px] sm:w-[240px] md:w-[280px] flex-shrink-0"
          >
            <Image
              src={image.image}
              height={240}
              width={200}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-full bg-[#FAF8F8] rounded-md object-cover "
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
