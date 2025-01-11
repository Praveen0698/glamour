import Image from "next/image";
import React from "react";
import about1 from "@/public/about-1.webp";
import about3 from "@/public/about-3.webp";
import about4 from "@/public/about-4.webp";
import about5 from "@/public/about-5.webp";

const About = () => {
  return (
    <section className="bg-[#cdb4db]" id="about">
      {/* First Section */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10 w-full px-6 sm:px-10 lg:px-[8rem] py-[2.5rem]">
        <Image
          src={about1}
          alt="about-1"
          className="w-full lg:w-1/2 h-[200px] sm:h-[280px] object-cover"
        />
        <div className="flex justify-start items-start gap-2.5 flex-col text-center lg:text-left">
          <h2 className="text-[1.75rem] sm:text-[2.15rem] font-bold">
            Welcome to Glamour Avenue
          </h2>
          <p className="text-[0.95rem] sm:text-[1rem] leading-relaxed">
            The Aesthetic Centre is to provide our clients with the highest
            level of professional services and products available. We strive to
            create positive changes in self-image, through customized programs
            driven by ongoing education, research, and genuine interest in
            continued client success.
          </p>
        </div>
      </div>

      {/* Second Section */}
      <div className="flex flex-col lg:flex-row-reverse justify-center items-end gap-10 w-full px-6 sm:px-10 lg:px-[8rem] py-[2.5rem]">
        <div className="flex flex-col gap-6 w-full lg:w-[70%] lg:order-1 sm:order-last">
          <div>
            <h2 className="text-[1.75rem] sm:text-[2.15rem] font-bold">
              OUR MISSION
            </h2>
            <p className="text-[0.95rem] sm:text-[1rem] leading-relaxed">
              To create a beautiful, comfortable environment where our clients
              come to receive the most effective treatments; guiding them to
              products that deliver the most effective benefits, offering a
              wealth of information, and interacting with a professional staff
              that truly cares about our client’s needs and desires.
            </p>
          </div>
          <div className="flex flex-wrap justify-between gap-4 max-770:hidden">
            <Image
              src={about4}
              alt="about-4"
              className="w-full sm:w-[30%] h-[180px] sm:h-[280px] rounded-lg object-cover "
            />
            <Image
              src={about5}
              alt="about-5"
              className="w-full sm:w-[30%] h-[180px] sm:h-[280px] rounded-lg object-cover"
            />
            <Image
              src={about4}
              alt="about-4"
              className="w-full sm:w-[30%] h-[180px] sm:h-[280px] rounded-lg object-cover"
            />
          </div>
        </div>
        <Image
          src={about3}
          alt="about-3"
          className="w-full lg:w-[30%] h-[280px] sm:h-[480px] rounded-lg object-cover"
        />
      </div>
    </section>
  );
};

export default About;
