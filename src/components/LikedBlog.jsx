import React, { useState, useEffect } from "react";
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
import { useAuthContext } from "../hooks/useAuthContext";
import Loading from "../components/Loading";
import axios from "axios";
import moment from "moment";

const LikedBlog = () => {
  const [openOptionId, setOpenOptionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  const toggleOptions = (id) => {
    setOpenOptionId((prevId) => (prevId === id ? null : id));
  };
  const { token } = useAuthContext();
  const getAuthorsLikedBlog = async () => {
    try {
      const { data } = await axios(
        `http://localhost:3000/api/blog/author/likes`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data);
      setBlogs(data.blogs);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuthorsLikedBlog();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (!isLoading && blogs.length === 0) {
    return (
      <div className="text-center">
        <h1>You are yet to like any blog post</h1>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex flex-col gap-6">
        {blogs.map((pro) => (
          <div
            key={pro._id}
            className="shadow p-5 rounded-xl bg-white flex flex-col gap-4"
          >
            {/* Author Section */}
            <div className="flex items-center gap-3">
              <img
                src={pro.author.profilePicture}
                alt="author"
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="font-medium">{pro.author.fullName}</p>
            </div>

            {/* Post Content */}
            <div className="flex flex-col lg:flex-row gap-5">
              {/* Text Section */}
              <div className="flex-1 min-w-0 space-y-4">
                <div className="flex gap-4 justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold">
                      {pro.title}
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-base break-words">
                      {pro.description}
                    </p>
                  </div>
                  {/* Right: Image */}
                  <div>
                    <img
                      src={pro.image}
                      alt="post"
                      className=" hidden md:block w-[116px] h-[116px]"
                    />
                  </div>
                </div>

                {/* Icons and Options */}
                <div className="flex justify-between flex-wrap items-center text-sm text-gray-500 gap-2">
                  <div className="flex flex-wrap items-center gap-4">
                    <p> {moment(pro.createdAt).format("MMM Do YY")}</p>
                    <div className="flex items-center gap-1">
                      <Heart size={17} color="red" />
                      <span>{pro.likes.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquareText size={17} />
                      <span>{pro.comments.length}</span>
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
