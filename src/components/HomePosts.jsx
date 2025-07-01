import React, { useEffect, useState } from "react";
import { homeposts } from "../Data/homeposts";
import { CircleMinus } from "lucide-react";
import { featured } from "../Data/featured";
import moment from "moment";
import {
  Heart,
  MessageSquareText,
  Bookmark,
  Ellipsis,
  Pencil,
  Share2,
  Trash2,
  HeartIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { useBlogContext } from "../hooks/useBlogContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const HomePosts = () => {
  const [openOptionId, setOpenOptionId] = useState(null);
  const { isLoading, blogs } = useBlogContext();
  const [like, setLike] = useState(false);
  const { token, user } = useAuthContext();

  const handleToggleLike = async (blogId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/blog/${blogId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);

      if (response.status === 200) {
        toast.success("done");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleOptions = (id) => {
    setOpenOptionId((prevId) => (prevId === id ? null : id));
  };

  if (isLoading) {
    return <Loading height={"50vh"} />;
  }

  return (
    <div className="">
      <div className="grid grid-cols-1  gap-6 my-6">
        {blogs.map((pro) => (
          <div key={pro._id} className="bg-white  p-4 ">
            <hr className="py-3" />
            <div className="space-y-4">
              {/* Author Section */}
              <div className="flex justify-between items-center">
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
                <button className="bg-[rgba(188,178,218,0.3)] px-4 rounded-xl text-sm py-1">
                  Follow
                </button>
              </div>

              {/* Post Content */}
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Left Text Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex gap-4 justify-between">
                    <div>
                      <Link to={`/blog/${pro._id}`} className="hover:underline">
                        <h3 className="text-lg sm:text-xl font-semibold">
                          {pro.title}
                        </h3>
                      </Link>

                      <p className="text-gray-500 text-sm sm:text-base break-words">
                        {pro.description}
                      </p>
                    </div>
                    {/* Right: Image */}
                    <div>
                      <img
                        src={pro.image}
                        alt="post"
                        className="w-fulll hidden md:block w-[116px] h-[116px]"
                      />
                    </div>
                  </div>

                  {/* Meta Info & Options */}
                  <div className="flex justify-between items-center text-gray-500 text-xs sm:text-sm flex-wrap gap-3">
                    {/* Left: date, likes, comments */}
                    <div className="flex gap-4 items-center flex-wrap">
                      <p>{moment(pro.createdAt).format("MMM Do")}</p>
                      <div className="flex items-center gap-1">
                        <button
                          className="cursor-pointer"
                          onClick={() => handleToggleLike(pro._id)}
                        >
                          {pro.likes.includes(user._id) ? (
                            <HeartIcon size={17} className="text-red-600" />
                          ) : (
                            <Heart size={17} />
                          )}
                        </button>
                        {pro.likes.length}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquareText size={17} />
                        {pro.comments.length}
                      </div>
                    </div>

                    {/* Right: bookmark and dropdown */}
                    <div className="flex items-center gap-2 relative">
                      <CircleMinus size={17} />
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

//http://localhost:3000/
export default HomePosts;
