import React from "react";
import { Link } from "react-router-dom";
import confirmreset from "../assets/amico.png";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";

const ConfirmResetPassword = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-between gap-6 items-center pt-18">
        <div className="bg-white hidden md:block w-full">
          <img
            src={confirmreset}
            alt=""
            
          />
        </div>
        <div className="bg-[rgba(196,192,207,0.1)] p-12 min-h-screen w-full  md:p-20 flex flex-col gap-7 ">
          <div className="space-y-2">
            <h3 className="font-bold text-[rgba(51,51,51,1)] text-xl">
              Reset Your Password
            </h3>
            <p className="text-sm text-[rgba(51,51,51,1)] font-semibold">
              Please check your email for next steps to reset your password.
            </p>
          </div>
          <div className="flex flex-col gap-12 md:gap-40">
            <button className="md:w-[50%] text-lg bg-[rgba(138,99,247,1)]  text-white px-4 py-2 rounded hover:bg-purple-400">
              Contact Support
            </button>
           <Link to="/login">
            <button className="bg-[rgba(51,51,51,1)] cursor-pointer text-white px-4 py-2 rounded w-full hover:bg-gray-600">
              Back to Login
            </button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmResetPassword;
