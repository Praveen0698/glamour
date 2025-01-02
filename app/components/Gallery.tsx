import React from "react";
import about1 from "@/public/about-1.webp";
import about3 from "@/public/about-3.webp";
import about4 from "@/public/about-4.webp";
import about5 from "@/public/about-5.webp";
import Image from "next/image";

const Gallery = () => {
  return (
    <section id="gallery" className="py-10 px-6 sm:px-10 lg:px-20 text-center">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6">
        GALLERY
      </h1>
      <div className="flex gap-4 overflow-x-auto my-scroll-container">
        {[about5, about4, about3, about1, about5, about3].map(
          (image, index) => (
            <div
              key={index}
              className="w-[200px] sm:w-[240px] md:w-[280px] flex-shrink-0"
            >
              <Image
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-auto bg-[#FAF8F8] rounded-md object-cover"
              />
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Gallery;
