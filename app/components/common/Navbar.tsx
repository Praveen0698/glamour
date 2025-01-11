"use client";

// import Link from "next/link";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null); // Explicitly type the ref

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleOutsideClick = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            setIsModalOpen(false);
        }
    };

    // const toggleMobileMenu = () => {
    //     setIsMobileMenuOpen(!isMobileMenuOpen);
    //   };

    // const handleLinkClick = () => {
    //     // Close the mobile menu when a link is clicked
    //     setIsMobileMenuOpen(false);
    //   };

    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-transparent absolute top-0 left-0 w-full z-50 text-white">
            <h1 className="font-gistesy text-nowrap text-[3rem] md:text-[2rem] font-bold text-[#D45E3D]">
                Glamour Avenue
            </h1>

            {/* Mobile Menu Toggle Button */}
            {/* <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="text-[#cdb4db] text-3xl">
          {isMobileMenuOpen ? "✖" : "☰"}
        </button>
      </div> */}

            {/* Navigation Links for Desktop */}
            <div
                className={`md:flex flex-col absolute md:static top-0 left-0 w-full bg-black md:bg-transparent md:flex-row md:items-center md:p-0 p-8 md:h-auto h-screen items-center justify-center transition-all duration-500 opacity-90 md:gap-4 md:opacity-100`}
            >
                <button
                    className="hover:text-[#cdb4db] text-xl sm:text-2xl lg:text-xl transition-all duration-500"
                    type="button"
                    onClick={() => {
                        const element = document.getElementById("home");
                        if (element) {
                            element.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                        }
                    }}
                >
                    Home
                </button>
                <button
                    className="hover:text-[#cdb4db] text-xl sm:text-2xl lg:text-xl transition-all duration-500"
                    type="button"
                    onClick={() => {
                        const element = document.getElementById("expertise");
                        if (element) {
                            element.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                        }
                    }}
                >
                    Expertise
                </button>
                <button
                    className="hover:text-[#cdb4db] text-xl sm:text-2xl lg:text-xl transition-all duration-500"
                    type="button"
                    onClick={() => {
                        const element = document.getElementById("about");
                        if (element) {
                            element.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                        }
                    }}
                >
                    About
                </button>
                <button
                    className="hover:text-[#cdb4db] text-xl sm:text-2xl lg:text-xl transition-all duration-500"
                    type="button"
                    onClick={() => {
                        const element = document.getElementById("products");
                        if (element) {
                            element.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                        }
                    }}
                >
                    Products
                </button>
                <button
                    className="hover:text-[#cdb4db] text-xl sm:text-2xl lg:text-xl transition-all duration-500"
                    type="button"
                    onClick={() => {
                        const element = document.getElementById("services");
                        if (element) {
                            element.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                        }
                    }}
                >
                    Services
                </button>
                <button
                    className="hover:text-[#cdb4db] text-xl sm:text-2xl lg:text-xl transition-all duration-500"
                    type="button"
                    onClick={() => {
                        const element = document.getElementById("gallery");
                        if (element) {
                            element.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                        }
                    }}
                >
                    Gallery
                </button>
                {/* <Link
                    href="#expertise"
                    className="hover:text-[#cdb4db] text-xl sm:text-2xl lg:text-xl transition-all duration-500"
                    onClick={handleLinkClick} // Close menu on link click
                >
                    Expertise
                </Link>
                <Link
                    href="#about"
                    className="hover:text-[#cdb4db] text-xl sm:text-2xl lg:text-xl transition-all duration-500"
                    onClick={handleLinkClick} // Close menu on link click
                >
                    About
                </Link>
                <Link
                    href="#products"
                    className="hover:text-[#cdb4db] text-xl sm:text-2xl lg:text-xl transition-all duration-500"
                    onClick={handleLinkClick} // Close menu on link click
                >
                    Products
                </Link>
                <Link
                    href="#services"
                    className="hover:text-[#cdb4db] text-xl sm:text-2xl lg:text-xl transition-all duration-500"
                    onClick={handleLinkClick} // Close menu on link click
                >
                    Services
                </Link> */}
                {/* <Link
                    href="#gallery"
                    className="hover:text-[#cdb4db] text-xl sm:text-2xl lg:text-xl transition-all duration-500"
                    onClick={handleLinkClick} // Close menu on link click
                >
                    Gallery
                </Link> */}
            </div>

            {/* "Get in Touch" Button for Desktop */}
            <div className="hidden md:block">
                <button
                    onClick={handleModalToggle}
                    className="px-4 py-2 text-nowrap bg-transparent border-[2px] border-[#cdb4db] text-[#cdb4db] rounded-md hover:bg-[#cdb4db] hover:text-white transition-all duration-500"
                >
                    Get in Touch
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={(e) =>
                        handleOutsideClick(e as unknown as MouseEvent)
                    }
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-white p-6 rounded-lg w-[90%] md:w-[40%] shadow-lg"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-center text-black">
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
