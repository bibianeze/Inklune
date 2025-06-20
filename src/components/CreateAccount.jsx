import React from 'react'
import { Link } from 'react-router-dom';

const CreateAccount = () => {
  return (
    <div className="bg-[rgba(138,99,247,1)]">
      <div className="container mx-auto w-11/12 flex flex-col items-center justify-center gap-5 py-12 text-white text-center">
        <h1 className="font-bold text-2xl lg:text-4xl ">
          Ready to Share Your Voice?
        </h1>
        <p className="lg:w-[800px]">
          Join a community of thoughtful writers and readers who value authentic
          connection and meaningful conversation.
        </p>
        <div className="flex gap-3">
          <Link to="/register">
            <button className="text-[rgba(138,99,247,1)] bg-white  hover:bg-transparent hover:border-1 hover:border-white hover:text-white py-2 px-4 rounded-lg">
              Create Account
            </button>
          </Link>
          <Link to="/login">
            <button className="border-1 border-white text-white hover:bg-white hover:text-[rgba(138,99,247,1)] py-2 px-4 rounded-lg">
              Learn more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount