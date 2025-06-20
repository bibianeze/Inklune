import React, { useState } from "react";
import { likedblogs } from "../Data/likedblogs";
import {
  Heart,
  MessageSquareText,
  Bookmark,
  Ellipsis,
  Pencil,
  Share2,
  Trash2,
} from "lucide-react";

const LikedBlog = () => {
  const [openOptionId, setOpenOptionId] = useState(null);

  const toggleOptions = (id) => {
    setOpenOptionId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="py-6">
      <div className="flex flex-col gap-6">
        {likedblogs.map((pro) => (
          <div
            key={pro.id}
            className="shadow p-5 rounded-xl bg-white flex flex-col gap-4"
          >
            {/* Author Section */}
            <div className="flex items-center gap-3">
              <img
                src={pro.image}
                alt="author"
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="font-medium">{pro.author}</p>
            </div>

            {/* Post Content */}
            <div className="flex flex-col lg:flex-row gap-5">
              {/* Text Section */}
              <div className="flex-1 min-w-0 space-y-4">
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

                {/* Icons and Options */}
                <div className="flex justify-between flex-wrap items-center text-sm text-gray-500 gap-2">
                  <div className="flex flex-wrap items-center gap-4">
                    <p>{pro.date}</p>
                    <div className="flex items-center gap-1">
                      <Heart size={17} color="red" />
                      <span>{pro.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquareText size={17} />
                      <span>{pro.comments}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 relative">
                    <Bookmark size={17} />

                    <button
                      className="bg-white rounded h-[34px] p-1 flex items-center"
                      onClick={() => toggleOptions(pro.id)}
                    >
                      <Ellipsis size={17} />
                    </button>

                    {/* Dropdown Menu */}
                    {openOptionId === pro.id && (
                      <div className="absolute lg:left-0 right-0 bottom-full mt-2 w-30 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <button className="w-full flex gap-2 items-center px-4 py-2 text-left hover:bg-gray-100">
                          <Pencil size={17} />
                          Edit
                        </button>
                        <button className="w-full flex gap-2 items-center px-4 py-2 text-left hover:bg-gray-100">
                          <Share2 size={17} />
                          Share
                        </button>
                        <button className="w-full flex gap-2 items-center px-4 py-2 text-left hover:bg-gray-100">
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
        ))}
      </div>
    </div>
  );
};

export default LikedBlog;
