import React from "react";
import Image from "next/image";
import permanent from "@/public/Permanent.webp";
import skin from "@/public/Skin.webp";
import injectables from "@/public/Injectables.webp";
import makeup from "@/public/makeup.webp";
import salon from "@/public/salon.webp";
import laser from "@/public/laser.webp";

const services = [
  {
    title: "Permanent Makeup",
    description:
      "Make getting ready in the morning a breeze with permanent makeup. This service is great for those who have cosmetic sensitivities, suffer from hair loss, or simply don't have the time for a full face every day.",
    image: permanent,
  },
  {
    title: "Skin Rejuvenation",
    description:
      "We combine the power of medical-grade skincare with revolutionary treatments to achieve powerful results. Our aestheticians create a custom skincare routine to target wrinkles, acne, hyperpigmentation, and sun damage.",
    image: skin,
  },
  {
    title: "Injectables & Fillers",
    description:
      "Fight signs of aging and rejuvenate your appearance with injectables & fillers. Whether you want to restore volume or re-contour, our experts will select the best treatment for your concerns.",
    image: injectables,
  },
  {
    title: "Makeup & Beauty",
    description:
      "We use the highest quality mineral makeup to enhance your natural beauty. Our cosmetic specialist offers makeup application lessons and assists in product selection.",
    image: makeup,
  },
  {
    title: "Salon",
    description:
      "Indulge in a luxurious experience at our salon, where beauty and relaxation come together. From expert hairstyling and vibrant color treatments to rejuvenating facials and soothing massages, we provide personalized care to enhance your natural beauty. Let us be your destination for self-care and transformation.",
    image: salon,
  },
  {
    title: "Laser Treatments",
    description:
      "The Aesthetic Center offers state-of-the-art laser services to treat various skin concerns, including IPL PhotoFacials, Laser Hair Removal, Carbon Laser Facial, and Tattoo Removal.",
    image: laser,
  },
];

export default function NewServices() {
  return (
    <section
      id="services"
      className="bg-[#cdb4db] px-4 sm:px-8 md:px-12 lg:px-[8rem] py-[2.5rem] text-center"
    >
      <h1 className="mx-auto text-2xl sm:text-3xl font-semibold mb-10">
        OUR SERVICES
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative group w-full h-[20rem] sm:h-[25rem] lg:h-[30rem] overflow-hidden rounded-lg shadow-lg"
          >
            {/* Image */}
            <Image
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Text Container */}
            <div className="absolute bottom-0 w-full h-full flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent">
              <div className="absolute bottom-5 w-full px-4 transition-transform duration-500 transform group-hover:translate-y-[-3rem]">
                {/* Title */}
                <h1 className="text-white text-xl sm:text-2xl lg:text-4xl font-bold mb-2 italic">
                  {service.title}
                </h1>

                {/* Description */}
                <p className="hidden group-hover:block text-sm sm:text-base font-semibold text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
