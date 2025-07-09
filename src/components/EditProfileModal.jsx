import React, { useState } from "react";
import image3 from "../assets/image (3).png";
import { X } from "lucide-react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const EditProfileModal = ({ onClose }) => {
  const { user, token, updateUser } = useAuthContext();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.profilePicture || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("bio", bio);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      const response = await axios.patch(
        "http://localhost:8000/api/auth/user",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("profile updated successfully");
        setIsSubmitting(false);
        updateUser(response.data.user); // Update global auth context
        onClose(); // Close modal
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-1 z-50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-700 cursor-pointer hover:text-gray-900"
          >
            <X size={24} />
          </button>
        </div>

        {/* Profile Image */}
        <div className="relative my-3 w-[65px]">
          <img
            src={imagePreview}
            alt="Profile avatar"
            className="w-full rounded-full object-cover"
          />
          <label className="absolute bottom-[-4px] left-11 cursor-pointer">
            <img src={image3} alt="Edit icon" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              required
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium">
              Bio
            </label>
            <textarea
              id="bio"
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded mt-1 h-28 resize-y focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 cursor-pointer py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {isSubmitting ? "Editing..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
