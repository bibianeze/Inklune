import React from 'react'

const SignUp = () => {
  return (
    <div>
      <div className="container mx-auto w-11/12 min-h-[100vh] flex flex-col gap-2 items-center justify-center py-3">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Create your Account
          </h1>
          <p className="text-[rgba(164,164,164,1)] md:w-[90%]">
            Join INKLUNE and start sharing your stories with the world
          </p>
        </div>
        <form className="space-y-4 border-2 border-[rgba(164,164,164,1)] w-full md:w-[50%] lg:w-[40%] p-4 md:p-9 rounded-lg shadow-xl">
          <div>
            <label htmlFor="fullname" className="text-[#797171]">
              Full Name:{" "}
            </label>
            <input
              className="w-full border-2 border-[rgba(164,164,164,1)] rounded-lg p-2"
              type="text"
              name="fullname"
              placeholder="John Doe"
              id="fullname"
            />
          </div>
          <div>
            <label htmlFor="Email" className="text-[#797171]">
              Email:{" "}
            </label>
            <input
              className="w-full border-2 border-[rgba(164,164,164,1)] rounded-lg p-2"
              type="email"
              placeholder="Johndoe@example.com"
              name="Email"
              id="Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-[#797171]">
              Password:{" "}
            </label>
            <input
              className="w-full border-2 border-[rgba(164,164,164,1)] rounded-lg p-2"
              type="password"
              placeholder="**********"
              name="password"
              id="password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-[#797171]">
              Confirm Password:{" "}
            </label>
            <input
              className="w-full border-2 border-[rgba(164,164,164,1)] rounded-lg p-2"
              type="password"
              placeholder="**********"
              name="confirmPassword"
              id="confirmPassword"
            />
          </div>
          <div className="space-y-4">
            <button className="w-full p-2 bg-[rgba(138,99,247,1)] rounded-lg text-white hover:bg-purple-400">
              Sign Up
            </button>
            <p className="text-center text-[#797171] ">
              Already have an account?{" "}
              <a className="text-[rgba(138,99,247,1)]" href="#">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp