import React, { useEffect, useState } from "react";
import { homeposts } from "../Data/homeposts";
import { CircleMinus } from "lucide-react";
import { featured } from "../Data/featured";
import moment from "moment";
// import moment from "moment";
import {
  Heart,
  MessageSquareText,
  Bookmark,
  // Ellipsis,
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
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const HomePosts = () => {
  const [openOptionId, setOpenOptionId] = useState(null);
  const { isLoading, blogs } = useBlogContext();
  const [like, setLike] = useState(false);
  const { token, user } = useAuthContext();

  const handleToggleLike = async (blogId) => {
    try {
      const response = await axios.post(
        `https://inklune-blog-server.onrender.com/api/blog/${blogId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);

      if (response.status === 200) {
        toast.success(response.data.message);
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const toggleOptions = (id) => {
  //   setOpenOptionId((prevId) => (prevId === id ? null : id));
  // };

  if (isLoading) {
    return <Loading height={"50vh"} />;
  }

  return (
    <div className="">
      <div className="grid grid-cols-1  gap-6 my-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white  p-4 ">
            <hr className="py-3" />
            <div className="space-y-4">
              {/* Author Section */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                <Link to = "/profile">
                  <img
                    src={blog.author.profilePicture}
                    alt="author"
                    className="w-10 h-10 rounded-full object-cover"
                  /></Link>
                  <p className="text-sm sm:text-base font-medium">
                    {blog.author.fullName}
                  </p>
                </div>
                
              </div>

              {/* Post Content */}
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Left Text Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex gap-4 justify-between">
                    <div>
                      <Link to={`/blog/${blog._id}`} className="hover:underline">
                        <h3 className="text-lg sm:text-xl font-semibold">
                          {blog.title}
                        </h3>
                      </Link>

                      <p className="text-gray-500 text-sm sm:text-base break-words">
                        {blog.description.substring(0, 150)}
                      </p>
                    </div>
                    {/* Right: Image */}
                    <div>
                      <img
                        src={blog.image}
                        alt="post"
                        className=" hidden md:block size-[150px]"
                      />
                    </div>
                  </div>

                  {/* Meta Info & Options */}
                  <div className="flex justify-between items-center text-gray-500 text-xs sm:text-sm flex-wrap gap-3">
                    {/* Left: date, likes, comments */}
                    <div className="flex gap-4 items-center flex-wrap">
                      <p>{moment(blog.createdAt).format("MMM Do")} </p>
                      <div className="flex items-center gap-1">
                        <button
                          className="cursor-pointer"
                          onClick={() => handleToggleLike(blog._id)}
                        >
                          {blog.likes.includes(user._id)  ? (
                            <FaHeart color="red" size={17} /> 
                          ) : (
                            <FaRegHeart color="gray" size={17} />
                          )}
                        </button>
                        {blog.likes.length}
                      </div>
                      <Link to={`/blog/${blog._id}`}>
                      <button className="flex cursor-pointer items-center gap-1">
                        <MessageSquareText size={17} />
                        {blog.comments.length}
                      </button>
                      </Link>
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


export default HomePosts;
