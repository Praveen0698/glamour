import Image from "next/image";
import React from "react";
import Prod1 from "@/public/prod1.webp";
import Prod2 from "@/public/prod2.webp";
import Prod3 from "@/public/prod3.webp";
import Prod4 from "@/public/prod4.webp";

const Products = () => {
  return (
    <section id="products">
      <div className="flex justify-start items-center gap-10 w-full px-[8rem] py-[2.5rem]">
        <div className="flex justify-start items-start gap-2.5 flex-col w-1/3">
          <h2 className="text-[2.15rem]">Products</h2>
          <p className="text-[1rem]">
            Discover a world of premium skincare, haircare, and beauty products
            crafted to rejuvenate, nourish, and enhance your natural glow. From
            gentle cleansers and hydrating serums to nourishing hair treatments
            and vibrant cosmetics, we offer solutions tailored to all your
            self-care needs. Elevate your routine with our curated collection
            for radiant beauty every day.
          </p>
        </div>
        <div className="flex gap-5 w-[100%] overflow-x-scroll my-scroll-container">
          <div className="w-[280px] flex-shrink-0">
            <Image
              src={Prod1}
              alt="about-1"
              className="w-full h-[280px] bg-[#FAF8F8]"
            />
            <div className="flex justify-center items-center flex-col gap-2.5">
              <span className="font-semibold">Facial Cleanser</span>
              <span className="font-thin">&#8377; 599 /-</span>
            </div>
          </div>
          <div className="w-[280px] flex-shrink-0">
            <Image
              src={Prod2}
              alt="about-1"
              className="w-full h-[280px]  bg-[#FAF8F8]"
            />
            <div className="flex justify-center items-center flex-col gap-2.5">
              <span className="font-semibold">Facial Cleanser</span>
              <span className="font-thin">&#8377; 599 /-</span>
            </div>
          </div>
          <div className="w-[280px] flex-shrink-0">
            <Image
              src={Prod3}
              alt="about-1"
              className="w-full h-[280px]  bg-[#FAF8F8]"
            />
            <div className="flex justify-center items-center flex-col gap-2.5">
              <span className="font-semibold">Facial Cleanser</span>
              <span className="font-thin">&#8377; 599 /-</span>
            </div>
          </div>
          <div className="w-[280px] flex-shrink-0">
            <Image
              src={Prod4}
              alt="about-1"
              className="w-full h-[280px] bg-[#FAF8F8]"
            />
            <div className="flex justify-center items-center flex-col gap-2.5">
              <span className="font-semibold">Facial Cleanser</span>
              <span className="font-thin">&#8377; 599 /-</span>
            </div>
          </div>
          <div className="w-[280px] flex-shrink-0">
            <Image
              src={Prod1}
              alt="about-1"
              className="w-full h-[280px] bg-[#FAF8F8]"
            />
            <div className="flex justify-center items-center flex-col gap-2.5">
              <span className="font-semibold">Facial Cleanser</span>
              <span className="font-thin">&#8377; 599 /-</span>
            </div>
          </div>
          <div className="w-[280px] flex-shrink-0">
            <Image
              src={Prod2}
              alt="about-1"
              className="w-full h-[280px] bg-[#FAF8F8]"
            />
            <div className="flex justify-center items-center flex-col gap-2.5">
              <span className="font-semibold">Facial Cleanser</span>
              <span className="font-thin">&#8377; 599 /-</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
