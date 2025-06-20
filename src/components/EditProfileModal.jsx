import React from "react";
import image from "../assets/Frame 21.png";
import { X } from "lucide-react";
import image3 from "../assets/image (3).png";

const EditProfileModal = ({ onClose }) => {
  return (
    // Overlay with transparent blur background (no black tint)
    <div className="fixed inset-1 z-50 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Modal container */}
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative ">
        {/* Header with title and close button */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
          <button
            onClick={onClose}
            aria-label="Close edit profile modal"
            className="text-gray-700 hover:text-gray-900"
          >
            <X size={24} />
          </button>
        </div>

        {/* Profile images */}
        <div className="relative my-3 w-[65px]">
          <img
            src={image}
            alt="Profile avatar"
            className="w-full rounded-full"
          />
          <div className="absolute bottom-[-4px] left-11">
            <img src={image3} alt="Edit icon" />
          </div>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              defaultValue="Bibian Okoro"
              className="w-full border border-gray-300 px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium">
              Bio
            </label>
            <textarea
              id="bio"
              defaultValue="As a proud Capricorn, I have a deep appreciation for nature, especially my vibrant flowers. I also enjoy indulging in luxurious hair care that reflects my personality."
              className="w-full border border-gray-300 px-3 py-2 rounded mt-1 h-28 resize-y focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
