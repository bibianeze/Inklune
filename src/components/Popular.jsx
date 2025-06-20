
import { popular } from '../Data/popular';
import React, { useState } from "react";
import { Heart } from "lucide-react";
import { MessageSquareText } from "lucide-react";

const Popular = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-10 w-full">
        {popular.map((blogpost) => {
          return (
            <div key={blogpost.id} className="w-full flex flex-col">
              {/* Image */}
              <div className="w-full aspect-video overflow-hidden rounded-t-[25px]">
                <img
                  src={blogpost.bigimage}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Content Box */}
              <div className="rounded-b-[25px] flex flex-col gap-6 p-4 sm:p-5 md:p-6 bg-white shadow-lg flex-grow">
                {/* Author Section */}
                <div className="flex items-center gap-3 min-w-0">
                  <span className="shrink-0">
                    <img
                      src={blogpost.image}
                      alt={blogpost.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold truncate">
                      {blogpost.author}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {blogpost.date} <span>{blogpost.duration}</span>
                    </p>
                  </div>
                </div>

                {/* Title & Content */}
                <div className="space-y-2">
                  <h3 className="font-bold text-lg sm:text-xl">
                    {blogpost.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    {blogpost.content}
                  </p>
                </div>

                {/* Tags & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="bg-[rgba(188,178,218,0.3)] py-1 px-4 rounded-full text-sm cursor-pointer">
                    {blogpost.tags}
                  </p>
                  <div className="flex gap-3 items-center text-sm text-gray-500">
                    <p className="flex items-center gap-1 font-medium">
                      <Heart size={16} />
                      <span>{blogpost.likes}</span>
                    </p>
                    <p className="flex items-center gap-1 font-medium">
                      <MessageSquareText size={16} />
                      <span>{blogpost.comments}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Popular