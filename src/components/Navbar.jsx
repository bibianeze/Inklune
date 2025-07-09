import React, { useState } from "react";
import inklunelogo from "../assets/Inklune logo.png";
import { Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Explore from "./Explore";
import Community from "./Community";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow-2xl py-4 fixed top-0 w-full z-50">
      <nav className="container mx-auto w-11/12 flex justify-between items-center">
        {/* Left: Logo + Nav Links */}
        <div className="flex items-center gap-4">
          <img src={inklunelogo} alt="inklune logo" className="w-24" />
          <ul className="hidden lg:flex gap-4 text-sm text-[rgba(110,110,126,1)] font-medium">
            <li>
              <a className="hover:underline" href="#">
                Home
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#explore">
                Explore
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#explore">
                Categories
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#community">
                Community
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Search + Buttons */}
        <div className="hidden lg:flex gap-5 items-center">
          <form className="flex items-center gap-2">
            <span className="relative left-9  text-gray-400 font-bold">
              <Search size={16} />
            </span>
            <input
              className="pl-8 text-sm w-72 pr-6 py-1.5 border-2 border-gray-300 rounded-2xl bg-[rgba(187,187,187,1)] "
              placeholder="Search Stories"
              type="text"
            />
          </form>

          <div className="space-x-3 hidden lg:flex">
            <Link to="/login ">
              <button className="border border-[rgba(138,99,247,1)] px-3 py-1 rounded text-[rgba(138,99,247,1)] hover:text-white hover:bg-[rgba(138,99,247,1)] transition">
                Sign In
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-[rgba(138,99,247,1)] text-white  px-3 py-1 rounded hover:bg-purple-300  transition">
                Sign Up
              </button>
            </Link>
          </div>
        </div>

        {/* Hamburger menu button for mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-500"
        >
          {isOpen ? <X size={34} /> : <Menu size={34} />}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="lg:hidden bg-white px-10 py-4 space-y-4 flex flex-col items-center text-center  text-[rgba(110,110,126,1)] ">

          <form className="flex relative justify-center items-center gap-2 w-full ">
            <span className="absolute left-3 ">
              <Search size={16} />
            </span>
            <input
              className="px-8 py-1 border w-full border-gray-300 rounded-2xl bg-[rgba(196,192,207,0.1)]"
              placeholder="Search Stories"
              type="text"
            />
          </form>

          <ul className="space-y-3">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Explore</a>
            </li>
            <li>
              <a href="#">Categories</a>
            </li>
            <li>
              <a href="#">Community</a>
            </li>
          </ul>
          
          <div className="border-1 border-slate-200 w-full"> </div>

          <div className="mt-4 flex flex-col gap-2 w-full ">
             <Link to="/login" className="w-full">
              <button className="border border-[rgba(138,99,247,1)] w-full px-3 py-1 rounded text-[rgba(138,99,247,1)] hover:text-white hover:bg-[rgba(138,99,247,1)] transition">
                Sign In
              </button>
            </Link>
            <Link to="/register" className="w-full">
              <button className="bg-[rgba(138,99,247,1)] text-white w-[100%]  px-3 py-1 rounded hover:bg-purple-300  transition">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
