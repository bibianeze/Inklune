import React from 'react'
import resetimg from "../assets/pana.png";
import { ArrowRight } from "lucide-react";
import Navbar from '../components/Navbar';


export const ResetPassword = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center gap-6 items-center min-h-[100vh] pt-20">
        <div className="bg-white w-full hidden md:block p-7 md:p-16 ">
          <img src={resetimg} alt="" />
        </div>
        <div className="bg-[rgba(196,192,207,0.1)] md:min-h-screen p-12 md:p-25 w-full flex flex-col gap-7">
          <div className="space-y-2">
            <h3 className="font-bold text-[rgba(51,51,51,1)] text-xl">
              Reset Your Password
            </h3>
            <p className="text-sm text-[rgba(51,51,51,1)] font-semibold">
              Type in your new password
            </p>
          </div>
          <form className="space-y-3">
            <div>
              <input
                className="w-full border-2 border-[rgba(164,164,164,1)]  p-2"
                type="email"
                placeholder="New Password*"
                name="Email"
                id="Email"
              />
            </div>
            <div>
              <input
                className="w-full border-2 border-[rgba(164,164,164,1)]  p-2"
                type="email"
                placeholder="Retry new Password"
                name="Email"
                id="Email"
              />
            </div>
            <button className="relative bg-[rgba(138,99,247,1)] flex items-center gap-2 text-white px-4 py-2 rounded hover:bg-purple-400">
              Next{" "}
              <span>
                <ArrowRight size={16} />
              </span>{" "}
            </button>
          </form>
          <button className="bg-[rgba(51,51,51,1)] text-white px-4 py-2 rounded w-full hover:bg-gray-600">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
