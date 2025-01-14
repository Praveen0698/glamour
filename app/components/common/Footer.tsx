import Image from "next/image";
import React from "react";
import logo from "@/public/logoGlamour.png";
import { FaGoogle } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <section className="bg-[#000] flex flex-col lg:flex-row justify-between items-center px-8 lg:px-[8rem] py-8">
      <div className="w-full lg:w-1/3 text-center mb-6 lg:mb-0">
        <h2 className="text-3xl font-semibold text-[#cdb4db]">Address</h2>
        <p className="text-[1rem] my-5 text-white">
          Gandhi Chowk, pardhia complex, near by Liquor shop, Brajrajnagar,
          Odisha 768216
        </p>
        <p className="text-white">
          <span className="font-medium ">MON - SUN:</span> 10AM - 8PM
        </p>
      </div>
      <div className="w-full lg:w-1/3 text-center mb-6 lg:mb-0">
        <Image src={logo} alt="logo" className="h-[280px] w-[280px] mx-auto" />
      </div>
      <div className="w-full lg:w-1/3 text-center">
        <h2 className="text-3xl font-semibold text-[#cdb4db]">CONTACT</h2>
        <p className="text-[1rem] my-5 text-white">+91 87631 10751</p>
        <div className="flex justify-center items-center gap-2.5 text-white">
          <a
            target="_blank"
            href="https://www.google.com/search?q=glamour+avenue+gandhi+chowk+brajrajnagar+&sca_esv=a4c4e0e02b25ffe0&rlz=1C1GCEA_enIN1133IN1133&sxsrf=ADLYWIJ90LTure5MiyFQz3Vjh4MMUo_-QA%3A1736854837087&ei=NU2GZ7r4BPKX4-EP6aOj6Q0&ved=0ahUKEwj65ty8kPWKAxXyyzgGHenRKN0Q4dUDCBA&uact=5&oq=glamour+avenue+gandhi+chowk+brajrajnagar+&gs_lp=Egxnd3Mtd2l6LXNlcnAiKWdsYW1vdXIgYXZlbnVlIGdhbmRoaSBjaG93ayBicmFqcmFqbmFnYXIgMgQQIxgnMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogRIxB5Q7AhY8RRwAXgAkAEAmAHyAaABwQyqAQMyLTe4AQPIAQD4AQGYAgWgAqsHwgILEAAYgAQYsAMYogSYAwCIBgGQBgWSBwUxLjAuNKAHzh8&sclient=gws-wiz-serp"
          >
            <FaGoogle className="text-[1.2rem] rounded-full bg-black text-[#cdb4db] cursor-pointer" />
          </a>

          <a
            target="_blank"
            href="https://www.instagram.com/glamouravenue.co?igsh=NDI4aDF2dWh5NWg2"
          >
            <AiFillInstagram className="text-[1.4rem] rounded-full bg-black text-[#cdb4db] cursor-pointer" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;
