import React, { useState } from "react";
import { profile } from "../Data/profile";
import {
  Heart,
  MessageSquareText,
  Bookmark,
  Ellipsis,
  Pencil,
  Share2,
  Trash2,
} from "lucide-react";

const YourBlog = () => {
  const [openOptionId, setOpenOptionId] = useState(null);

  const toggleOptions = (id) => {
    setOpenOptionId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="">
      <div className="grid grid-cols-1  gap-6 my-6">
        {profile.map((pro) => (
          <div key={pro.id} className="bg-white shadow-md p-4 rounded-xl">
            <div className="space-y-4">
              {/* Author Section */}
              <div className="flex items-center gap-3">
                <img
                  src={pro.image}
                  alt="author"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="text-sm sm:text-base font-medium">{pro.author}</p>
              </div>

              {/* Post Content */}
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Left Text Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex gap-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold">
                        {pro.title}
                      </h3>
                      <p className="text-gray-500 text-sm sm:text-base break-words">
                        {pro.content}
                      </p>
                    </div>
                    {/* Right: Image */}
                    <div>
                      <img src={pro.sqimg} alt="post" className="w-full hidden md:block" />
                    </div>
                  </div>

                  {/* Meta Info & Options */}
                  <div className="flex justify-between items-center text-gray-500 text-xs sm:text-sm flex-wrap gap-3">
                    {/* Left: date, likes, comments */}
                    <div className="flex gap-4 items-center flex-wrap">
                      <p>{pro.date}</p>
                      <div className="flex items-center gap-1">
                        <Heart size={17} />
                        {pro.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquareText size={17} />
                        {pro.comments}
                      </div>
                    </div>

                    {/* Right: bookmark and dropdown */}
                    <div className="flex items-center gap-2 relative">
                      <Bookmark size={17} />

                      <button
                        className="bg-white rounded h-[34px] p-1 flex items-center"
                        onClick={() => toggleOptions(pro.id)}
                      >
                        <Ellipsis size={17} />
                      </button>

                      {/* Dropdown Options */}
                      {openOptionId === pro.id && (
                        <div className="absolute lg:left-0 right-0 bottom-full mt-2 w-30 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                          <button className="w-full flex gap-1 items-center px-4 py-2 text-left hover:bg-gray-100">
                            <Pencil size={17} />
                            Edit
                          </button>
                          <button className="w-full flex gap-1 items-center px-4 py-2 text-left hover:bg-gray-100">
                            <Share2 size={17} />
                            Share
                          </button>
                          <button className="w-full flex gap-1 items-center px-4 py-2 text-left hover:bg-gray-100 text-red-500">
                            <Trash2 size={17} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourBlog;
