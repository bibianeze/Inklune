import React, { useState } from "react";
import inklunelogo from "../assets/Inklune logo.png";
import personicon from "../assets/Signup comp.png";
import { Search, Menu, X } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { LogOut } from "lucide-react";

import write from "../assets/hugeicons_quill-write-02.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
const Navbar3 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthContext();
  const redirect = useNavigate();
  const handleLogout = () => {
    logout();
    redirect("/login");
  };
  return (
    <div>
      <div className="bg-white shadow-2xl py-4 w-full">
        <nav className="container mx-auto w-11/12 flex justify-between items-center">
          {/* Left: Logo + Nav Links */}
          <div className="flex items-center gap-4">
            <Link to="/loggedin">
              <img src={inklunelogo} alt="inklune logo" className="w-24" />
            </Link>
            <form className="hidden md:flex items-center gap-2">
              <span className="relative left-9  text-gray-400 font-bold">
                <Search size={16} />
              </span>
              <input
                className="pl-8 w-72 text-sm pr-6 py-1.5 border-2 border-gray-300 rounded-2xl bg-[rgba(187,187,187,1)] "
                placeholder="Search Stories"
                type="text"
              />
            </form>
          </div>

          <div className="hidden md:flex gap-5 items-center">
            <div className="flex gap-5 items-center">
              <button
                onClick={handleLogout}
                className="cursor-pointer"
                title="Log Out"
              >
                <LogOut className="text-red-500" />
              </button>
              <Link to="/profile" className="cursor-pointer">
                <img
                  src={user?.profilePicture}
                  alt=""
                  className="w-[40px] h-[40px]"
                />
              </Link>
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
          <div className="md:hidden flex items-center bg-white px-6 py-4 space-x-4  text-[rgba(110,110,126,1)] ">
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
            <div className="flex gap-5 items-center mt-[-5px]">
              <button
                onClick={handleLogout}
                className="cursor-pointer"
                title="Log Out"
              >
                <LogOut className="text-red-500" />
              </button>
              <Link to="/profile" className="cursor-pointer">
                <img
                  src={user?.profilePicture}
                  alt=""
                  className="w-[40px] h-[40px]"
                />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar3;
