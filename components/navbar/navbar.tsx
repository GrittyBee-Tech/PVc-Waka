import React from "react";
import { AiOutlineBaidu } from "react-icons/ai";
import { GiVote } from "react-icons/gi";
import { IoFootstepsSharp } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className=" grid grid-flow-col lg:px-20 justify-between p-6 shadow-md">
      <div className=" grid grid-flow-col   gap-2 text-2xl text-[#7ec992] font-bold">
        <h1>PVC WAKA</h1>
        <IoFootstepsSharp className=" text-4xl" />
      </div>

      <div className="grid grid-flow-col gap-6 text-lg">
        <a href="#about" className="hover:underline text-[#7ec992] ">
          About
        </a>
        <a href="#contact" className="hover:underline text-[#7ec992] ">
          Contact
        </a>
      </div>
      <hr className="border-t border-gray-600" />
    </nav>
  );
};

export default Navbar;
