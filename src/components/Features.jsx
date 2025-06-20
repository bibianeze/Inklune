import React, { useState } from "react";
import { blogposts } from "../Data/data";
import { Heart } from "lucide-react";
import { MessageSquareText } from "lucide-react";
import Popular from "./Popular";
// import { HeartOff, MessageSquareOff } from "lucide-react";

const Features = () => {
  const [activeTab, setActiveTab] = useState("latest");

  // Track liked and commented posts by their id
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentedPosts, setCommentedPosts] = useState([]);

  // Handle like click
  const handleLike = (postId) => {
    if (!likedPosts.includes(postId)) {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  // Handle comment click
  const handleComment = (postId) => {
    if (!commentedPosts.includes(postId)) {
      setCommentedPosts([...commentedPosts, postId]);
    }
  };

  return (
    <div>
      <div className="container mx-auto w-11/12 ">
        {/* Header and Tabs */}
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Features List</h3>
          <div className="bg-[rgba(188,178,218,0.3)] p-2 flex gap-3 rounded-2xl">
            <button
              className={`px-5 rounded-xl cursor-pointer ${
                activeTab === "latest" ? "bg-white font-bold" : ""
              }`}
              onClick={() => setActiveTab("latest")}
            >
              Latest
            </button>
            <button
              className={`px-5 rounded-xl cursor-pointer ${
                activeTab === "popular" ? "bg-white font-bold" : ""
              }`}
              onClick={() => setActiveTab("popular")}
            >
              Popular
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "latest" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-10 w-full">
            {blogposts.map((blogpost) => (
              <div key={blogpost.id} className="w-full flex flex-col">
                {/* Image */}
                <div className="w-full aspect-video overflow-hidden rounded-t-[20px]">
                  <img
                    src={blogpost.bigimage}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Content */}
                <div className="rounded-b-[25px] flex flex-col gap-5 p-4 sm:p-5 md:p-6 bg-white shadow-lg flex-grow">
                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <span className="shrink-0">
                      <img
                        src={blogpost.image}
                        alt={blogpost.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base truncate">
                        {blogpost.author}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {blogpost.date} <span>{blogpost.duration}</span>
                      </p>
                    </div>
                  </div>

                  {/* Title and Content */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg sm:text-xl">
                      {blogpost.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700">
                      {blogpost.content}
                    </p>
                  </div>

                  {/* Tags and Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="bg-[rgba(188,178,218,0.3)] py-1 px-4 rounded-full text-sm cursor-pointer">
                      {blogpost.tags}
                    </p>

                    <div className="flex gap-3 items-center">
                      <button
                        disabled={likedPosts.includes(blogpost.id)}
                        onClick={() => handleLike(blogpost.id)}
                        className={`flex items-center gap-1 text-gray-500 font-medium text-sm transition-opacity ${
                          likedPosts.includes(blogpost.id)
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:opacity-80"
                        }`}
                      >
                        <Heart size={16} />
                        <span>{blogpost.likes}</span>
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                          Please sign in to interact
                        </span>
                      </button>

                      <button
                        disabled={commentedPosts.includes(blogpost.id)}
                        onClick={() => handleComment(blogpost.id)}
                        className={`flex items-center gap-1 text-gray-500 font-medium text-sm transition-opacity ${
                          commentedPosts.includes(blogpost.id)
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:opacity-80"
                        }`}
                      >
                        <MessageSquareText size={16} />
                        <span>{blogpost.comments}</span>
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                          Please sign in to interact
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "popular" && (
          <div className="py-10">
            <Popular />
          </div>
        )}

        {/* View More Stories Button */}
        <div className="w-full text-center py-6 ">
          <button className="border-1 p-2 text-center hover:bg-[rgba(142,142,142,1)]">
            View More Stories
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;
