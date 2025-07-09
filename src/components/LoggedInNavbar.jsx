import React, { useRef, useState } from "react";
import inklunelogo from "../assets/Inklune logo.png";
import personicon from "../assets/Signup comp.png";
import { Search, Menu, X } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { LogOut } from "lucide-react";
import write from "../assets/hugeicons_quill-write-02.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBlogContext } from "../hooks/useBlogContext";
import { useNavigate, Link } from "react-router-dom";

const LoggedInNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthContext();
  const { setSearch } = useBlogContext();
  const redirect = useNavigate();
  const inputref = useRef(null);
  const handleLogout = () => {
    logout();
    redirect("/login");
  };

  const handleSearchBlog = (e) => {
    e.preventDefault();
    console.log(inputref.current.value);
    setSearch(inputref.current.value);
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
            <form
              onSubmit={handleSearchBlog}
              className="hidden md:flex items-center gap-2"
            >
              <span className="relative left-9  text-gray-400 font-bold">
                <Search size={16} />
              </span>
              <input
                className="pl-8 w-72 text-sm pr-6 py-1.5 border-2 border-gray-300 rounded-2xl bg-[rgba(187,187,187,1)] "
                placeholder="Search Stories"
                type="text"
                ref={inputref}
              />
            </form>
          </div>

          <div className="hidden md:flex gap-5 items-center">
            <div className="flex gap-5 items-center">
              
              <Link to="/create">
                <div className="gap-1 hidden md:flex ">
                  <img src={write} alt="" />
                  <p>write</p>
                </div>
              </Link>
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
                  className="w-[40px] h-[40px] rounded-full object-cover"
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
          <div className="md:hidden z-10 absolute flex flex-col w-full items-start justify-center px-6 bg-white py-6 gap-4 space-x-4  text-[rgba(110,110,126,1)] ">
            {/* <ul className="lg:hidden gap-4 text-sm text-[rgba(110,110,126,1)] font-medium">
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
                  className="w-[40px] h-[40px] object-cover"
                />
              </Link>
            </div> */}
                    <form className="flex relative justify-center items-center gap-2 w-full">
                        <span className="absolute left-3 ">
                          <Search size={16} />
                        </span>
                        <input
                          className="px-8 py-1 border w-full border-gray-300 rounded-2xl bg-[rgba(196,192,207,0.1)]"
                          placeholder="Search Stories"
                          type="text"
                        />
                      </form>
            
                      <ul className="space-y-5 place-items-start place-content-start text-center py-4">
                        {/* <li>
                          <a href="#">Home</a>
                        </li>
                        <li>
                          <a href="#">Explore</a>
                        </li>
                        <li>
                          <a href="#">Categories</a>
                        </li> */}
                        <li className="">
                          <Link to="/profile" className="cursor-pointer flex gap-2">
                            <img
                              src={user?.profilePicture}
                              alt=""
                              className="size-[27px] rounded-full object-cover"
                            />
                            <p>PROFILE</p>
                          </Link>
                        </li>
                        
                          <li className="">
                            <Link to="/create" className="flex gap-2">
                              <img src={write} alt="" />
                              <a href="#">WRITE</a>
                            </Link>
                          </li>
                        

                         <Link to="/login" className="flex">
                          <button className=" w-full  flex gap-2 rounded text-red-600 hover:text-white hover:bg-[rgba(138,99,247,1)] transition">
                            
                             <LogOut className="text-red-500"/>
                             LOG OUT
                          </button>
                        </Link>
                      </ul>
                      
                      {/* <div className="border-1 border-slate-200 w-full"> </div> */}
            
                      {/* <div className="mt-1 flex flex-col items-center gap-2 w-full py-4"> */}
                        
                        {/* <Link to="/register" className="w-full">
                          <button className="bg-[rgba(138,99,247,1)] text-white w-[100%]  px-3 py-1 rounded hover:bg-purple-300  transition">
                            Sign Up
                          </button>
                        </Link> */}
                      {/* </div> */}
                    </div>
        )}
      </div>
    </div>
  );
};

export default LoggedInNavbar;
