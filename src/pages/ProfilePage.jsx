import React, { useState } from "react";
import LoggedInNavbar from "../components/LoggedInNavbar";
import profileimage from "../assets/image (2).png";
import { Pencil } from "lucide-react";
import YourBlog from "../components/YourBlog";
import LikedBlog from "../components/LikedBlog";
import EditProfileModal from "../components/EditProfileModal";
import { useAuthContext } from "../hooks/useAuthContext";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("yourBlogs");
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <LoggedInNavbar />

      <div className="w-full max-w-3xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-8">
          {/* Profile Section */}
          <div className="flex flex-col lg:flex-row items-start gap-6">
            <div className="flex justify-center w-full lg:w-auto">
              <img
                className="  rounded-lg object-cover w-[96px] h-[96px]"
                src={user?.profilePicture}
                alt="profile"
              />
            </div>

            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-2xl font-bold">{user?.fullName} </h3>
                <button
                  className="bg-white shadow px-4 py-2 flex items-center gap-2 rounded hover:bg-gray-100 transition"
                  onClick={() => setShowModal(true)}
                >
                  Edit <Pencil size={18} />
                </button>
              </div>

              <div className="bg-white shadow rounded p-4 mt-4">
                <p className="text-gray-400 font-medium mb-1">Bio</p>
                <p className="text-gray-700 text-sm">
                  {user?.bio ? user?.bio : "No Bio yet"}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs and Filters */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="space-x-4">
              <button
                className={`hover:text-purple-500 transition ${
                  activeTab === "yourBlogs"
                    ? "text-purple-600 font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("yourBlogs")}
              >
                Your Blogs
              </button>
              <button
                className={`hover:text-purple-500 transition ${
                  activeTab === "likedBlogs"
                    ? "text-purple-600 font-semibold"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("likedBlogs")}
              >
                Liked Blogs
              </button>
            </div>
            <div className="space-x-4">
              <button className="hover:text-purple-400 text-gray-600 transition">
                Latest
              </button>
              <button className="hover:text-purple-400 text-gray-600 transition">
                Popular
              </button>
            </div>
          </div>

          {/* Blog Content */}
          <div>
            {activeTab === "yourBlogs" && <YourBlog />}
            {activeTab === "likedBlogs" && <LikedBlog />}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50  bg-opacity-30 backdrop-blur-sm flex justify-center items-center px-4">
          <EditProfileModal onClose={() => setShowModal(false)} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
