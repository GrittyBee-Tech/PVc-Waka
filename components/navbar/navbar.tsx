import React from "react";
import { GiVote } from "react-icons/gi";

const Navbar = () => {
  return (
    <nav className="grid grid-flow-col lg:px-20 justify-between items-center p-6 shadow-md">
      <div className=" grid grid-flow-col   gap-2 text-2xl text-[#7ec992] font-bold">
        <h1>PVC WAKA</h1>
        <GiVote className="text-white" />
      </div>

      <div className="">
        <a href="#about" className="hover:underline text-[#7ec992] ">
          About
        </a>
        <a href="#contact" className="hover:underline text-[#7ec992] ">
          Contact
        </a>
        <div className="inline-flex gap-4 ml-4">
          <button className="hover:underline text-[#7ec992]">Login</button>
          <button className="hover:underline text-[#7ec992]">Register</button>
        </div>
      </div>
      <hr className="border-t border-gray-600" />
    </nav>
  );
};

export default Navbar;
