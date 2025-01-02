import Image from "next/image";
import React from "react";
import Prod1 from "@/public/prod1.webp";
import Prod2 from "@/public/prod2.webp";
import Prod3 from "@/public/prod3.webp";
import Prod4 from "@/public/prod4.webp";

const Products = () => {
  return (
    <section id="products" className="py-10 px-6 sm:px-10 lg:px-20">
      <div className="flex flex-col lg:flex-row justify-start items-start gap-10">
        {/* Text Section */}
        <div className="flex flex-col gap-4 lg:w-1/3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            Products
          </h2>
          <p className="text-base sm:text-lg">
            Discover a world of premium skincare, haircare, and beauty products
            crafted to rejuvenate, nourish, and enhance your natural glow. From
            gentle cleansers and hydrating serums to nourishing hair treatments
            and vibrant cosmetics, we offer solutions tailored to all your
            self-care needs. Elevate your routine with our curated collection
            for radiant beauty every day.
          </p>
        </div>

        {/* Products Section */}
        <div className="flex gap-5 w-full overflow-x-auto my-scroll-container">
          {[Prod1, Prod2, Prod3, Prod4, Prod1, Prod2].map((product, index) => (
            <div key={index} className="w-[240px] sm:w-[280px] flex-shrink-0">
              <Image
                src={product}
                alt={`product-${index + 1}`}
                className="w-full h-[240px] sm:h-[280px] bg-[#FAF8F8] object-cover"
              />
              <div className="flex flex-col items-center gap-2.5 mt-2">
                <span className="font-semibold text-sm sm:text-base">
                  Facial Cleanser
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
