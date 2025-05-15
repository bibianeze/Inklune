import React from 'react'
import logo from "../assets/Inklune logo.png"

const SignIn = () => {
  return (
    <div>
      <div className="container mx-auto w-11/12 min-h-[100vh] flex flex-col gap-4 items-center justify-center py-3">
        <img className="w-30 md:w-40" src={logo} alt="" />
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Welcome Back</h1>
          <p className="text-[rgba(164,164,164,1)] w-[90%]">
            Sign In to continue your writing journey
          </p>
        </div>
        <form className="space-y-4 border-2 border-[rgba(164,164,164,1)] w-full md:w-[50%] lg:w-[40%] p-4 md:p-9 rounded-lg shadow-xl">
          <div>
            <label className="text-[#797171]">Email Address: </label>
            <input
              className="w-full border-2 border-[rgba(164,164,164,1)] rounded-lg p-2"
              type="email"
              placeholder="Johndoe@example.com"
            />
          </div>
          <div>
            <div className="flex justify-between">
              <label className="text-[#797171]">Password: </label>
              <a className="text-[rgba(164,164,164,1)]" href="#">
                Forgot Password?
              </a>
            </div>
            <input
              className="w-full border-2 border-[rgba(164,164,164,1)] rounded-lg p-2"
              type="password"
              placeholder="**********"
            />
          </div>
          <div className="space-y-4">
            <button className="w-full p-2 bg-[rgba(138,99,247,1)] rounded-lg text-white hover:bg-purple-400">
              Sign In
            </button>
            <p className="text-center text-[#797171] ">
              Don’t have an account yet?{" "}
              <a className="text-[rgba(138,99,247,1)]" href="#">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn