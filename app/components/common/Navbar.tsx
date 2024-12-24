import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-transparent absolute top-0 left-0 w-full z-50 text-white">
      <div className="text-2xl font-bold">
        <Image src={logo} alt="logo" className="w-full h-20 " />
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
          href="#contact"
          className="hover:text-[#cdb4db] transition-all duration-500"
        >
          Contact
        </Link>
      </div>
      <button className="px-4 py-2 bg-transparent border-[2px] border-[#cdb4db] text-[#cdb4db] rounded-md hover:bg-[#cdb4db] hover:text-white transition-all duration-500">
        Get in Touch
      </button>
    </nav>
  );
};

export default Navbar;
