import React, {useState} from 'react'
import inklunelogo from "../assets/Inklune logo.png";
import personicon from "../assets/Signup comp.png"
import { Search, Menu, X } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { Bell } from "lucide-react";

const LoggedInNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="bg-white shadow-2xl py-4 fixed top-0 w-full z-50">
        <nav className="container mx-auto w-11/12 flex justify-between items-center">
          {/* Left: Logo + Nav Links */}
          <div className="flex items-center gap-4">
            <img src={inklunelogo} alt="inklune logo" className="w-24" />
            <form className="hidden md:flex items-center gap-2">
              <span className="relative left-9  text-gray-400 font-bold">
                <Search size={16} />
              </span>
              <input
                className="pl-8 text-sm pr-6 py-1.5 border-2 border-gray-300 rounded-2xl bg-[rgba(187,187,187,1)] "
                placeholder="Search Stories"
                type="text"
              />
            </form>
          </div>

          <div className="hidden md:flex gap-5 items-center">
            <div className="flex gap-5 items-center">
              <Ellipsis className="text-gray-500" />
              <Bell className="text-gray-500" />
              <img src={personicon} alt="" />
            </div>
          </div>

          {/* Hamburger menu button for mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-500"
          >
            {isOpen ? <X size={34} /> : <Menu size={34} />}
          </button>
        </nav>

        {/* Mobile dropdown menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col items-center bg-white px-6 py-4 space-y-4  text-[rgba(110,110,126,1)] ">
            <form className="flex items-center gap-2 ">
              <span className="relative left-7 ">
                <Search size={16} />
              </span>
              <input
                className="px-7 py-1 border border-gray-300 rounded-2xl bg-[rgba(196,192,207,0.1)]"
                placeholder="Search Stories"
                type="text"
              />
            </form>
            <div className="flex gap-5 items-center">
              <Ellipsis className="text-gray-500" />
              <Bell className="text-gray-500" />
              <img src={personicon} alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoggedInNavbar