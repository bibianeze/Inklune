import React, { useState, useEffect } from "react";
import { likedblogs } from "../Data/likedblogs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import {
  Heart,
  MessageSquareText,
  Bookmark,
  Ellipsis,
  Pencil,
  Share2,
  Trash2,
  HeartIcon
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
  const { token, user } = useAuthContext();
  const getAuthorsLikedBlog = async () => {
    try {
      const { data } = await axios(
        `https://inklune-blog-server.onrender.com/api/blog/author/likes`,
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


    const handleDeleteBlog = async (blogId) => {
    try {
      const response = await axios.delete(
        `https://inklune-blog-server.onrender.com/api/blog/${blogId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        toast.success("blog deleted");
        getAuthorsBlog(); // Refresh blog after deletion
      }
      // if (response.status === 403) {
      //   toast.error("You do not have permission to delete this ");
      // }
    } catch (error) {
      console.log(error);
    }
  };
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
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                      className=" hidden md:block w-[116px] h-[116px]"
                    />
                  </div>
                </div>

                {/* Icons and Options */}
                <div className="flex justify-between flex-wrap items-center text-sm text-gray-500 gap-2">
                  <div className="flex flex-wrap items-center gap-4">
                    <p> {moment(pro.createdAt).format("MMM Do YY")}</p>
                    <div className="flex items-center gap-1">
                      {/* <Heart size={17} color="red" />
                      <span>{pro.likes.length}</span> */}
                      <button
                        className="cursor-pointer flex"
                        onClick={() => handleToggleLike(pro._id)}
                      >
                        {pro.likes.includes(user._id) ? (
                          <FaHeart color="red" size={17} /> 
                        ) : (
                         <FaRegHeart color="gray" size={17} /> 
                        )}
                        {pro.likes.length}
                      </button>
                    </div>
                    
                    <Link to={`/blog/${pro._id}`}>
                    <button className="flex items-center gap-1">
                      <MessageSquareText size={17} />
                      <span>{pro.comments.length}</span>
                    </button>
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 relative">
                    <button
                    onClick={() => handleDeleteBlog(pro._id)}
                    className="w-full flex gap-1 items-center px-4 py-2 text-left hover:bg-gray-100 text-red-500"
                  >
                    {pro.author._id === user._id && (<Trash2 size={17} /> )} 
                    
                  </button>
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
