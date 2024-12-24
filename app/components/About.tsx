import Image from "next/image";
import React from "react";
import about1 from "@/public/about-1.webp";
import about3 from "@/public/about-3.webp";
import about4 from "@/public/about-4.webp";
import about5 from "@/public/about-5.webp";

const About = () => {
  return (
    <section className="bg-[#cdb4db]" id="about">
      <div className="flex justify-center items-center gap-10 w-full px-[8rem] py-[2.5rem]">
        <Image src={about1} alt="about-1" className="w-1/2 h-[280px]" />
        <div className="flex justify-start items-start gap-2.5 flex-col">
          <h2 className="text-[2.15rem]">Welcome to Glamour Avenue</h2>
          <p className="text-[1rem]">
            The Aesthetic Centre is to provide our clients with the highest
            level of professional services and products available. We strive to
            create positive changes in self-image, through customized programs
            driven by ongoing education, research, and genuine interest in
            continued client success.
          </p>
        </div>
      </div>
      <div className="flex justify-center items-start gap-10 w-full px-[8rem] py-[2.5rem]">
        <div className="flex justify-between items-start gap-2.5 flex-col h-[480px] w-[70%]">
          <div>
            <h2 className="text-[2.15rem]">OUR MISSION</h2>
            <p className="text-[1rem]">
              To create a beautiful, comfortable environment where our clients
              come to receive the most effective treatments; guiding them to
              products that deliver the most effective benefits, offering a
              wealth of information, and interacting with a professional staff
              that truly cares about our client’s needs and desires.
            </p>
          </div>
          <div className="flex gap-2.5 w-full">
            <Image
              src={about4}
              alt="about-4"
              className="w-1/3 h-[280px] rounded-lg"
            />
            <Image
              src={about5}
              alt="about-5"
              className="w-1/3 h-[280px] rounded-lg"
            />
            <Image
              src={about4}
              alt="about-4"
              className="w-1/3 h-[280px] rounded-lg"
            />
          </div>
        </div>
        <Image
          src={about3}
          alt="about-3"
          className="w-[30%] h-[480px] rounded-lg"
        />
      </div>
    </section>
  );
};

export default About;
