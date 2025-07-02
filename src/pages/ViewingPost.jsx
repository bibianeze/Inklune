import React, { useEffect } from "react";
import LoggedInNavbar from "../components/LoggedInNavbar";
import { ArrowLeft } from "lucide-react";
import { EllipsisVertical } from "lucide-react";
import bmess from "../assets/A beautiful hot mess.png";
import tags from "../assets/Popular Tags List.png";
import { viewingposts } from "../Data/viewingposts";
import { comments } from "../Data/comments";
import { ThumbsUp } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Heart } from "lucide-react";
import { MessageSquareText } from "lucide-react";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { Share2 } from "lucide-react";
import { ThumbsDown } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
import moment from "moment";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
//get the params

const ViewingPost = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { blogId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [blog, setBlog] = useState({});
  const [text, setText] = useState("");
  const { token } = useAuthContext();

  const handleGetBlog = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(`http://localhost:3000/api/blog/${blogId}`);
      console.log(data);
      setBlog(data.blog);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetBlog();
  }, []);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:3000/api/blog/${blogId}/comment`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("Comment Added");
        setBlog(data.blog);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/blog/${blogId}/comment/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        toast.success("Comment deleted");
      }
      if (response.status === 403) {
        toast.error("You do not have permission to delete this comment");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return (
      <div>
        <LoggedInNavbar />
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <LoggedInNavbar />
      <div className="bg-[rgba(188,178,218,0.3)]">
        <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {/* Main content grid - responsive layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[2fr_1fr] gap-6 lg:gap-8">
            {/* Main content */}
            <div className="w-full">
              {/* Header section */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0 mb-7">
                <Link to="/loggedin">
                  <button className="bg-white flex gap-1 items-center px-2 py-1 rounded w-fit">
                    <ArrowLeft size={19} />
                    <span>back</span>
                  </button>
                </Link>

                <div className="relative self-start sm:self-auto">
                  <button
                    className="bg-white rounded h-[34px] p-1"
                    onClick={() => setShowOptions((prev) => !prev)}
                  >
                    <EllipsisVertical />
                  </button>

                  {showOptions && (
                    <div className="absolute right-0 sm:left-0 mt-2 w-36 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                      <button className="w-full flex gap-1 items-center px-4 py-2 text-left hover:bg-gray-100">
                        <Pencil size={17} />
                        Edit
                      </button>
                      <button className="w-full flex gap-1 items-center px-4 py-2 text-left hover:bg-gray-100">
                        <Share2 size={17} />
                        Share
                      </button>
                      <button className="w-full flex gap-1 items-center px-4 py-2 text-left hover:bg-gray-100">
                        Follow Author
                      </button>
                      <button className="w-full flex gap-1 items-center px-4 py-2 text-left hover:bg-gray-100 text-red-500">
                        Report Story
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Article content */}
              <div className="flex flex-col gap-3">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                  {blog.title}
                </h1>
                <div className="text-sm flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
                  <span className="border py-1 px-3 rounded-lg w-fit capitalize">
                    {blog.tag}
                  </span>
                  <span>{moment(blog.createdAt).format("MMM Do YY")}</span>
                </div>

                {/* Article body */}
                <div>
                  <div className="space-y-5">
                    <img
                      className="w-full rounded-lg h-[495px] object-cover"
                      src={blog.image}
                      alt=""
                    />
                    <p className="leading-relaxed text-sm sm:text-base">
                      {blog.description}
                    </p>
                    <div>
                      <p className="bg-amber-200 rounded-lg px-1.5 w-fit">
                        #{blog.tag}
                      </p>
                    </div>

                    {/* Like/Dislike section */}
                    <div>
                      <div className="flex gap-2 items-center bg-white w-fit px-3 py-2 rounded text-gray-600">
                        <span className="text-sm">Like</span>
                        <div className="flex items-center gap-2">
                          <button className="flex gap-1 items-center hover:text-red-500 transition-colors">
                            <span className="text-sm">22</span>
                            <ThumbsUp size={17} color="red" />
                          </button>
                          <span className="border-l border-gray-300 h-4"></span>
                          <button className="hover:text-red-500 transition-colors">
                            <ThumbsDown size={17} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments section */}
                  <div className="mt-6 flex flex-col gap-4">
                    <div className="bg-white p-3 sm:p-4 rounded-xl flex flex-col gap-2">
                      <h3 className="text-lg font-semibold">Comment</h3>
                      <form
                        className="relative w-full"
                        onSubmit={handleAddComment}
                      >
                        <input
                          type="text"
                          className="bg-[rgba(188,178,218,0.3)] w-full border border-gray-400 px-4 py-3 pr-4 sm:pr-24 rounded-xl text-sm sm:text-base"
                          placeholder="Enter a comment"
                          required
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="mt-2 sm:mt-0 sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 bg-[rgba(138,99,247,1)] text-white px-3 py-2 rounded-xl text-sm w-full sm:w-auto"
                        >
                          <span className="sm:hidden">Submit Comment</span>
                          <span className="hidden sm:inline">Enter</span>
                        </button>
                      </form>
                    </div>

                    {blog.comments.length > 0 && (
                      <div className="bg-white p-3 sm:p-4 rounded-xl space-y-4">
                        {blog.comments.map((comment) => {
                          return (
                            <div
                              key={comment._id}
                              className="py-2 bg-[rgba(188,178,218,0.3)] p-3 rounded-xl"
                            >
                              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
                                <div className="flex items-center gap-2">
                                  <img
                                    src={comment.user.profilePicture}
                                    alt=""
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                                  />
                                  <p className="text-sm sm:text-base font-medium">
                                    {comment.user.fullName}
                                  </p>
                                </div>
                                <div className="flex gap-2 items-center self-start sm:self-auto">
                                  <button
                                    onClick={() =>
                                      handleDeleteComment(comment._id)
                                    }
                                    className="hover:text-red-500 transition-colors"
                                  >
                                    <Trash2 size={17} color="gray" />
                                  </button>
                                </div>
                              </div>
                              <div className="border border-gray-400 bg-white p-3 sm:p-3.5 rounded-xl mt-2">
                                <p className="text-gray-600 text-sm sm:text-base">
                                  {comment.text}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full xl:max-w-[400px] space-y-6">
              {/* Author posts section */}
              <div className="bg-[rgba(196,192,207,0.1)] rounded-xl grid grid-cols-1 gap-5 py-5 w-full px-4">
                <h3 className="text-lg font-semibold">
                  {blog.author.fullName}
                </h3>
                <hr className="text-gray-300" />

                <div className="space-y-6">
                  {viewingposts.map((blogpost) => {
                    return (
                      <div key={blogpost.id} className="w-full">
                        <div className="w-full">
                          <img
                            src={blogpost.bigimage}
                            alt=""
                            className="object-cover w-full h-48 sm:h-56 rounded-t-lg"
                          />
                        </div>
                        <div className="rounded-b-lg flex flex-col gap-4 p-4 sm:p-6 bg-white shadow-lg">
                          {/* Article preview */}
                          <div className="space-y-2">
                            <h3 className="font-bold text-lg sm:text-xl leading-tight">
                              {blogpost.title}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
                              {blogpost.content}
                            </p>
                          </div>

                          {/* Tags and read more */}
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 sm:items-center">
                            <p className="bg-[rgba(188,178,218,0.3)] py-1 px-3 sm:px-5 rounded-full cursor-pointer text-sm w-fit hover:bg-[rgba(188,178,218,0.5)] transition-colors">
                              {blogpost.tags}
                            </p>
                            <p className="text-[rgba(142,142,142,1)] underline text-sm hover:text-blue-600 cursor-pointer">
                              Read more
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="text-center text-[rgba(142,142,142,1)] underline text-sm hover:text-blue-600 cursor-pointer">
                  See more of Bibian's post
                </p>
              </div>

              {/* Recommended section */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3">
                  Recommended
                </h3>
                <div className="bg-[rgba(196,192,207,0.1)] rounded-xl grid grid-cols-1 gap-5 py-5 w-full px-4">
                  <div className="space-y-6">
                    {viewingposts.map((blogpost) => {
                      return (
                        <div key={blogpost.id} className="w-full">
                          <div className="w-full">
                            <img
                              src={blogpost.bigimage}
                              alt=""
                              className="object-cover w-full h-48 sm:h-56 rounded-t-lg"
                            />
                          </div>
                          <div className="rounded-b-lg flex flex-col gap-4 p-4 sm:p-6 bg-white shadow-lg">
                            {/* Article preview */}
                            <div className="space-y-2">
                              <h3 className="font-bold text-lg sm:text-xl leading-tight">
                                {blogpost.title}
                              </h3>
                              <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
                                {blogpost.content}
                              </p>
                            </div>

                            {/* Tags and read more */}
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 sm:items-center">
                              <p className="bg-[rgba(188,178,218,0.3)] py-1 px-3 sm:px-5 rounded-full cursor-pointer text-sm w-fit hover:bg-[rgba(188,178,218,0.5)] transition-colors">
                                {blogpost.tags}
                              </p>
                              <p className="text-[rgba(142,142,142,1)] underline text-sm hover:text-blue-600 cursor-pointer">
                                Read more
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-center text-[rgba(142,142,142,1)] underline text-sm hover:text-blue-600 cursor-pointer">
                    View all posts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewingPost;
