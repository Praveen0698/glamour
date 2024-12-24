import React from "react";
import about1 from "@/public/about-1.webp";
import about3 from "@/public/about-3.webp";
import about4 from "@/public/about-4.webp";
import about5 from "@/public/about-5.webp";
import Image from "next/image";

const Gallery = () => {
  return (
    <section className="px-[8rem] py-8 text-center">
      <h1 className="text-[2.15rem] mb-5">GALLERY</h1>
      <div className="flex gap-5 w-[100%] overflow-x-scroll my-scroll-container">
        <div className="w-[280px] flex-shrink-0">
          <Image
            src={about5}
            alt="about-1"
            className="w-full h-[280px] bg-[#FAF8F8] rounded-md"
          />
        </div>
        <div className="w-[280px] flex-shrink-0">
          <Image
            src={about4}
            alt="about-1"
            className="w-full h-[280px] bg-[#FAF8F8] rounded-md"
          />
        </div>
        <div className="w-[280px] flex-shrink-0">
          <Image
            src={about3}
            alt="about-1"
            className="w-full h-[280px] bg-[#FAF8F8] rounded-md"
          />
        </div>
        <div className="w-[280px] flex-shrink-0">
          <Image
            src={about1}
            alt="about-1"
            className="w-full h-[280px] bg-[#FAF8F8] rounded-md"
          />
        </div>
        <div className="w-[280px] flex-shrink-0">
          <Image
            src={about5}
            alt="about-1"
            className="w-full h-[280px] bg-[#FAF8F8] rounded-md"
          />
        </div>
        <div className="w-[280px] flex-shrink-0">
          <Image
            src={about3}
            alt="about-1"
            className="w-full h-[280px] bg-[#FAF8F8] rounded-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
