import React from "react";
import { Link } from "react-router-dom";

const JoinDiscussionModal = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicked inside
      >
        {/* Modal Content */}
        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="text-2xl font-bold">Want to join the conversation?</h1>
          <p className="text-gray-700 text-sm">
            Create a free account to like posts, reply, and meet other
            thoughtful writers.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
            <Link to="/register" className="w-full sm:w-1/2">
              <button className="bg-[rgba(138,99,247,1)] text-white px-4 py-2 rounded-md hover:bg-purple-500 transition w-full">
                Create Account
              </button>
            </Link>
            <Link to="/login" className="w-full sm:w-1/2">
              <button className="border border-[rgba(138,99,247,1)] px-4 py-2 rounded-md text-[rgba(138,99,247,1)] hover:text-white hover:bg-[rgba(138,99,247,1)] transition w-full">
                Sign In
              </button>
            </Link>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinDiscussionModal;
