"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface ProductItem {
  _id: string;
  image: string;
  title: string;
}

const Products = () => {
  const [getProductsData, setProductsData] = useState<ProductItem[]>([]);

  const getProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProductsData(response.data.data); // Assuming response.data contains the product data
    } catch (error) {
      console.error("Error fetching products data:", error);
      return []; // Return empty array on error
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  console.log(getProductsData);
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
          {getProductsData.map((product, index) => (
            <div key={index} className="w-[240px] sm:w-[280px] flex-shrink-0">
              <Image
                src={product.image}
                alt={`product-${index + 1}`}
                height={240}
                width={200}
                className="w-full h-[240px] rounded-md sm:h-[280px] bg-[#FAF8F8] object-cover"
              />
              <div className="flex flex-col items-center gap-2.5 mt-2">
                <span className="font-semibold text-sm sm:text-base">
                  {product.title}
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
