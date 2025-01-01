"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null); // Explicitly type the ref

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-transparent absolute top-0 left-0 w-full z-50 text-white">
      <div className="text-2xl font-bold">
        {/* <Image src={logo} alt="logo" className="w-full h-20 " /> */}
        <h1 className="font-gistesy text-[3rem] font-bold text-[#D45E3D]">
          Glamour Avenue
        </h1>
      </div>
      <div className="hidden md:flex space-x-10">
        <Link
          href="#home"
          className="hover:text-[#cdb4db] transition-all duration-500 "
        >
          Home
        </Link>
        <Link
          href="#expertise"
          className="hover:text-[#cdb4db] transition-all duration-500 "
        >
          Expertise
        </Link>
        <Link
          href="#about"
          className="hover:text-[#cdb4db] transition-all duration-500"
        >
          About
        </Link>
        <Link
          href="#products"
          className="hover:text-[#cdb4db] transition-all duration-500"
        >
          Products
        </Link>
        <Link
          href="#services"
          className="hover:text-[#cdb4db] transition-all duration-500"
        >
          Services
        </Link>
        <Link
          href="#gallery"
          className="hover:text-[#cdb4db] transition-all duration-500"
        >
          Gallery
        </Link>
      </div>
      <button
        onClick={handleModalToggle}
        className="px-4 py-2 bg-transparent border-[2px] border-[#cdb4db] text-[#cdb4db] rounded-md hover:bg-[#cdb4db] hover:text-white transition-all duration-500"
      >
        Get in Touch
      </button>
      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={(e) => handleOutsideClick(e as unknown as MouseEvent)}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white p-6 rounded-lg w-[90%] md:w-[40%] shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Book Appointment
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#cdb4db]"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#cdb4db]"
                  placeholder="Enter your mobile number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Requirement
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#cdb4db]"
                  rows={4}
                  placeholder="Enter your requirement"
                ></textarea>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleModalToggle}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#cdb4db] text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
