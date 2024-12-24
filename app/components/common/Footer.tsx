import Image from "next/image";
import React from "react";
import logo from "@/public/logoGlamour.png";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <section className="bg-[#cdb4db] flex justify-between items-center px-[8rem] py-8">
      <div className="w-1/3 text-center">
        <h2 className="text-3xl font-semibold">Address</h2>
        <p className="text-[1rem] my-5">
          Gandhi Chowk, pardhia complex, near by Liquor shop, Brajrajnagar,
          Odisha 768216
        </p>
        <p>
          <span className="font-medium">MON - SUN:</span> 10AM - 10PM
        </p>
      </div>
      <div className="w-1/3 text-center">
        <Image src={logo} alt="logo" className="h-[280px] w-[280px] mx-auto" />
      </div>
      <div className="w-1/3 text-center">
        <h2 className="text-3xl font-semibold">CONTACT</h2>
        <p className="text-[1rem] my-5">+91 87631 10751</p>
        <div className="flex justify-center items-center gap-2.5">
          <FaFacebookF className="text-[2rem] p-1.5 rounded-full bg-gray-300 cursor-pointer" />
          <AiFillInstagram className="text-[2rem] p-1.5 rounded-full bg-gray-300 cursor-pointer" />
          <FaYoutube className="text-[2rem] p-1.5 rounded-full bg-gray-300 cursor-pointer" />
        </div>
      </div>
    </section>
  );
};

export default Footer;
