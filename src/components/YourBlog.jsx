import React, { useEffect, useState } from "react";
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
import { useAuthContext } from "../hooks/useAuthContext";
import Loading from "../components/Loading";
import axios from "axios";
import moment from "moment";

const YourBlog = () => {
  const [openOptionId, setOpenOptionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  const toggleOptions = (id) => {
    setOpenOptionId((prevId) => (prevId === id ? null : id));
  };
  const { token } = useAuthContext();
  const getAuthorsBlog = async () => {
    try {
      const { data } = await axios(`http://localhost:3000/api/blog/author`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      setBlogs(data.blogs);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuthorsBlog();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (!isLoading && blogs.length === 0) {
    return (
      <div className="text-center">
        <h1>You are yet to write any blog post</h1>
      </div>
    );
  }
  return (
    <div className="">
      <div className="grid grid-cols-1  gap-6 my-6">
        {blogs.map((pro) => (
          <div key={pro._id} className="bg-white shadow-md p-4 rounded-xl">
            <div className="space-y-4">
              {/* Author Section */}
              <div className="flex items-center gap-3">
                <img
                  src={pro.author.profilePicture}
                  alt="author"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="text-sm sm:text-base font-medium">
                  {pro.author.fullName}
                </p>
              </div>

              {/* Post Content */}
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Left Text Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex gap-4 justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold">
                        {pro.title}
                      </h3>
                      <p className="text-gray-500 text-sm sm:text-base break-words">
                        {pro.description.substring(0, 100)}
                      </p>
                    </div>
                    {/* Right: Image */}
                    <div>
                      <img
                        src={pro.image}
                        alt="post"
                        className="hidden md:block h-[116px] w-[116px] object-cover"
                      />
                    </div>
                  </div>

                  {/* Meta Info & Options */}
                  <div className="flex justify-between items-center text-gray-500 text-xs sm:text-sm flex-wrap gap-3">
                    {/* Left: date, likes, comments */}
                    <div className="flex gap-4 items-center flex-wrap">
                      <p> {moment(pro.createdAt).format("MMM Do YY")}</p>
                      <div className="flex items-center gap-1">
                        <Heart size={17} />
                        {pro.likes.length}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquareText size={17} />
                        {pro.comments.length}
                      </div>
                    </div>

                    {/* Right: bookmark and dropdown */}
                    <div className="flex items-center gap-2 relative">
                      <Bookmark size={17} />

                      <button
                        className="bg-white rounded h-[34px] p-1 flex items-center"
                        onClick={() => toggleOptions(pro._id)}
                      >
                        <Ellipsis size={17} />
                      </button>

                      {/* Dropdown Options */}
                      {openOptionId === pro._id && (
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
