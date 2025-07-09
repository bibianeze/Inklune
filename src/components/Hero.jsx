import React from 'react'
import Navbar from "../components/Navbar";
import heroImg from "../assets/382999f196d6f8582815b19c05d05620df376f26.gif";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div>
      <div>
        <div className="container w-11/12 mx-auto flex flex-col md:flex-row justify-center  md:justify-between py-5">
          <div className=" flex justify-between text-center gap-10 items-center py-17">
            <div className="  md:py-20 py-8 space-y-4 lg:items-start flex flex-col items-center justify-center ">
              <h1 className="text-2xl lg:text-nowrap font-semibold md:text-[42px] leading-[1.2]">
                Write Under the Moon.
              </h1>
              <h1 className="text-2xl text-nowrap font-semibold md:text-[42px] leading-[1.2]">
                Shine Beyond the Stars.
              </h1>

              <p className=" w-[100%] md:w-[80%] sm:[70%] text-center md:text-start">
                A living archive of voices where ideas are planted,
                conversations bloom, and communities grow. Join the writers and
                thinkers who value connection over noise.
              </p>
              <div className="space-x-3 mt-3 flex flex-col md:flex-row md:justify-between lg:justify-start gap-2">
                <Link to="/register" className='w-full'>
                  <button className="bg-[rgba(138,99,247,1)] text-white w-[180px]  px-5 py-2 rounded hover:bg-purple-300  transition">
                    Start Writing
                  </button>
                </Link>
                <Link to="/register" className='w-full'>
                <button className="border border-[rgba(138,99,247,1)] w-[180px] px-5 py-2 rounded text-[rgba(138,99,247,1)] hover:text-white hover:bg-[rgba(138,99,247,1)] transition">
                  Explore Stories
                </button>
                </Link>
              </div>
            </div>
           
          </div>
            <div className="hidden lg:block w-[100%]">
              <img className="w-full h-full" src={heroImg} alt="" />
            </div>
        </div>
      </div>
    </div>
  );
}

export default Hero