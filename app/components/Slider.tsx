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

const Slider = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <section className="relative overflow-hidden">
      <div className="w-full h-[100vh] flex items-center justify-center relative">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(/bgimage.webp)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 md:px-12 py-4 md:py-6 bg-black bg-opacity-50">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-white text-3xl md:text-5xl lg:text-6xl font-bold text-center px-4 py-2 rounded-lg sm:leading-[50px] md:leading-[70px]"
          >
            Let your skin and hair tell a story of care, <br /> confidence,{" "}
            <br /> and timeless beauty.
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-6 md:mt-10">
              <button
                onClick={handleModalToggle}
                className="px-7 py-4 w-[20rem] text-2xl bg-[#cdb4db] text-white rounded-md"
              >
                BOOK APPOINTMENT
              </button>
              <button
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
                className="px-7 w-[20rem] py-4 text-2xl bg-transparent border-[2px] border-[#cdb4db] text-[#cdb4db] rounded-md "
              >
                VIEW SERVICE
              </button>
            </div>
          </motion.div>
        </div>
      </div>

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
                  className="w-full text-gray-600 outline-none px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#cdb4db]"
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
                  className="w-full text-gray-600 outline-none px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#cdb4db]"
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
    </section>
  );
};

export default Slider;
