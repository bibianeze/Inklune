import React from 'react'
import Navbar from "../components/Navbar";
import heroImg from "../assets/Hero Image.png";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div>
      <div>
        <div>
          <div className="xl:container mx-auto w-11/12 grid lg:grid-cols-2 justify-center text-center lg:text-start gap-9 items-center py-17">
            <div className="p-14 space-y-6">
              <h1 className="text-2xl font-semibold md:text-[47px] leading-[1.2]">
                Write Under the Moon.
              </h1>
              <h1 className="text-2xl font-semibold md:text-[47px] leading-[1.2]">
                Shine Beyond the Stars.
              </h1>

              <p className="lg:w-[500px] text-sm">
                A living archive of voices where ideas are planted,
                conversations bloom, and communities grow. Join the writers and
                thinkers who value connection over noise.
              </p>
              <div className="space-x-3 mt-9 flex flex-col md:flex-row gap-2">
                <Link to="/register">
                  <button className="bg-[rgba(138,99,247,1)] text-white  px-7 py-2 rounded hover:bg-purple-300  transition">
                    Start Writing
                  </button>
                </Link>
                <button className="border border-[rgba(138,99,247,1)] px-5 py-2 rounded text-[rgba(138,99,247,1)] hover:text-white hover:bg-[rgba(138,99,247,1)] transition">
                  <a href="">Explore Stories</a>
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img className="w-[100%] " src={heroImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero