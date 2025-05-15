import React from 'react'
import Navbar from '../components/Navbar'
import forgotimg from "../assets/Frame 56.png"
import { ArrowRight } from "lucide-react";

const ForgotPassword = () => {
  return (
    <div>
      <Navbar />

      <div className="flex flex-col md:flex-row justify-center gap-6 items-center min-h-[100vh] pt-20">
        <div className="bg-[rgba(196,192,207,0.1)] w-[100%] hidden md:block md:h-screen p-7 md:p-16">
          <img src={forgotimg} alt="" />
        </div>
        <div className="p-12 md:p-25 w-[100%] flex flex-col gap-7">
          <div className="space-y-2">
            <h3 className="font-bold text-[rgba(51,51,51,1)] text-xl">
              Reset Your Password
            </h3>
            <p className="text-sm text-[rgba(51,51,51,1)] font-semibold">
              Type in your registered email address to reset password
            </p>
          </div>
          <form className="space-y-3">
            <div className='flex flex-col gap-3'>
              <label htmlFor='Email' className="text-[#797171]">Email Address: </label>
              <input
                className="w-full border-2 border-[rgba(164,164,164,1)] rounded-lg p-2"
                type="email"
                placeholder="Johndoe@example.com"
                name='Email'
                id='Email'
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

export default ForgotPassword