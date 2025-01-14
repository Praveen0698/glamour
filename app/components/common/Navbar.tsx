"use client";

import React, {
  useState,
  useRef,
  ChangeEvent,
  FormEvent,
  MouseEvent,
} from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null); // Explicitly type the ref
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    requirement: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    // Close the mobile menu when a link is clicked
    setIsMobileMenuOpen(false);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Appointment query placed",
          icon: "success",
          confirmButtonColor: "#cdb4db",
        });
        handleModalToggle(); // Close the modal
        setFormData({
          name: "",
          mobile: "",
          requirement: "",
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: "Failed to place appointment query.",
          icon: "error",
          confirmButtonColor: "red",
        });
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      Swal.fire({
        title: "Failed!",
        text: "Failed to place appointment query.",
        icon: "error",
        confirmButtonColor: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-transparent absolute top-0 left-0 w-full z-50 text-white">
      <h1 className="font-gistesy text-nowrap text-[3rem] md:text-[2rem] font-bold text-[#D45E3D]">
        Glamour Avenue
      </h1>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="text-[#cdb4db] text-3xl">
          {isMobileMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Navigation Links for Desktop */}
      <div className="flex justify-center items-center gap-10 max-770:hidden">
        <button
          className="hover:text-[#cdb4db] font-thin font-roboto text-base max-770:text-xl transition-all duration-500"
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
          className="hover:text-[#cdb4db] font-thin font-roboto text-base max-770:text-xl transition-all duration-500"
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
          className="hover:text-[#cdb4db] font-thin font-roboto text-base max-770:text-xl transition-all duration-500"
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
          className="hover:text-[#cdb4db] font-thin font-roboto text-base max-770:text-xl transition-all duration-500"
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
          className="hover:text-[#cdb4db] font-thin font-roboto text-base max-770:text-xl transition-all duration-500"
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
          className="hover:text-[#cdb4db] font-thin font-roboto text-base max-770:text-xl transition-all duration-500"
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

      {isMobileMenuOpen && (
        <div className="flex flex-col absolute top-0 right-0 w-full h-[100dvh] bg-black opacity-90 z-50 justify-center items-center gap-10 transition-all duration-500">
          <p className="absolute right-10 top-10" onClick={toggleMobileMenu}>
            ✖
          </p>
          <button
            className="hover:text-[#cdb4db] font-bold font-mono text-xl sm:text-2xl lg:text-xl transition-all duration-500"
            type="button"
            onClick={() => {
              const element = document.getElementById("home");
              if (element) {
                element.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
              handleLinkClick();
            }}
          >
            Home
          </button>
          <button
            className="hover:text-[#cdb4db] font-bold font-mono text-xl sm:text-2xl lg:text-xl transition-all duration-500"
            type="button"
            onClick={() => {
              const element = document.getElementById("expertise");
              if (element) {
                element.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
              handleLinkClick();
            }}
          >
            Expertise
          </button>
          <button
            className="hover:text-[#cdb4db] font-bold font-mono text-xl sm:text-2xl lg:text-xl transition-all duration-500"
            type="button"
            onClick={() => {
              const element = document.getElementById("about");
              if (element) {
                element.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
              handleLinkClick();
            }}
          >
            About
          </button>
          <button
            className="hover:text-[#cdb4db] font-bold font-mono text-xl sm:text-2xl lg:text-xl transition-all duration-500"
            type="button"
            onClick={() => {
              const element = document.getElementById("products");
              if (element) {
                element.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
              handleLinkClick();
            }}
          >
            Products
          </button>
          <button
            className="hover:text-[#cdb4db] font-bold font-mono text-xl sm:text-2xl lg:text-xl transition-all duration-500"
            type="button"
            onClick={() => {
              const element = document.getElementById("services");
              if (element) {
                element.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
              handleLinkClick();
            }}
          >
            Services
          </button>
          <button
            className="hover:text-[#cdb4db] font-bold font-mono text-xl sm:text-2xl lg:text-xl transition-all duration-500"
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
          <div>
            <button
              onClick={() => {
                handleModalToggle();
                handleLinkClick();
              }}
              className="px-4 py-2 text-nowrap bg-transparent border-[2px] border-[#cdb4db] text-[#cdb4db] rounded-md hover:bg-[#cdb4db] hover:text-white transition-all duration-500"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}

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
            <h2 className="text-2xl font-bold mb-4 text-center text-black">
              Book Appointment
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full text-gray-600 outline-none px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#cdb4db]"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Mobile
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full outline-none px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#cdb4db] text-gray-600"
                  placeholder="Enter your mobile number"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Requirement
                </label>
                <textarea
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleInputChange}
                  className="w-full outline-none text-gray-600 px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#cdb4db]"
                  rows={4}
                  placeholder="Enter your requirement"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleModalToggle}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#cdb4db] text-white rounded-md"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
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
