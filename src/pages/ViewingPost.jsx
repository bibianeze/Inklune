// Import React and hooks
import React, { useEffect, useState } from "react";

// Import UI components and icons
import LoggedInNavbar from "../components/LoggedInNavbar";
import {
  ArrowLeft,
  EllipsisVertical,
  ThumbsUp,
  Trash2,
  Heart,
  MessageSquareText,
  Pencil,
  Share2,
  ThumbsDown,
} from "lucide-react";

// Import static assets
import bmess from "../assets/A beautiful hot mess.png";
import tags from "../assets/Popular Tags List.png";

// Import data (used for development/demo purposes)
import { viewingposts } from "../Data/viewingposts";
import { comments } from "../Data/comments";

// Import routing and utility libraries
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
import moment from "moment";

// Import authentication context and toast notifications
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";

// ViewingPost component definition
const ViewingPost = () => {
  // Local state definitions
  const [showOptions, setShowOptions] = useState(false); // Dropdown toggle state
  const { blogId } = useParams(); // Get blog ID from URL
  const [isLoading, setIsLoading] = useState(true); // Loading indicator state
  const [blog, setBlog] = useState({}); // Store fetched blog data
  const [otherBlogs, setOthers] = useState([]); // Store other blogs by same author
  const [text, setText] = useState(""); // Comment input text
  const { token, user } = useAuthContext(); // Auth token from context

  // Fetch blog data by ID
  const handleGetBlog = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios(`https://inklune-blog-server.onrender.com/api/blog/${blogId}`);
      console.log(data);
      setBlog(data.blog);
      setOthers(data.otherBlogs);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Trigger blog fetch when blogId changes
  useEffect(() => {
    handleGetBlog();
  }, [blogId]);

  // Add comment handler
  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://inklune-blog-server.onrender.com/api/blog/${blogId}/comment`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("Comment Added");
        setBlog(data.blog); // Refresh blog with new comment
        window.location.reload()
        setText(""); // Clear input
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete comment handler
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `https://inklune-blog-server.onrender.com/api/blog/${blogId}/comment/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    
      if (response.status === 200) {
        toast.success("Comment deleted");
        handleGetBlog(); // Refresh blog after deletion
      }
      if (response.status === 403) {
        toast.error("You do not have permission to delete this comment");
      }
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

  // Render loading state
  if (isLoading) {
    return (
      <div>
        <LoggedInNavbar />
        <Loading />
      </div>
    );
  }

  // Main render
  return (
    <div>
      <LoggedInNavbar />
      <div className="bg-[rgba(188,178,218,0.3)]">
        <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[2fr_1fr] gap-6 lg:gap-8">
            {/* Left column - blog content */}
            <div className="w-full">
              {/* Blog header section */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0 mb-7">
                <Link to="/loggedin">
                  <button className="bg-white cursor-pointer flex gap-1 items-center px-2 py-1 rounded w-fit">
                    <ArrowLeft size={19} />
                    <span>back</span>
                  </button>
                </Link>

                {/* Dropdown menu for blog actions */}
                {/* <div className="relative self-start sm:self-auto">
                  <button
                    className="bg-white rounded h-[34px] p-1"
                    onClick={() => setShowOptions((prev) => !prev)}
                  >
                    <EllipsisVertical />
                  </button> */}

                  {/* Options dropdown */}
                  {/* {showOptions && (
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
                  )} */}
                {/* </div> */}
              </div>

              {/* Blog content section */}
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

                <div className="space-y-5">
                  <img
                    className="w-full rounded-lg h-[495px] object-cover"
                    src={blog.image}
                    alt="Blog"
                  />
                  <p className="leading-relaxed text-sm sm:text-base">
                    {blog.description}
                  </p>
                  <p className="bg-gray-300  rounded-full py-1 px-3 w-fit">
                    #{blog.tag}
                  </p>

                  {/* Like section */}
                  <div className="flex gap-2 items-center bg-white w-fit px-3 py-2 rounded text-gray-600">
                    <span className="text-sm">Like</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleLike(blog._id)}
                        className="flex gap-1 items-center  transition-colors"
                      >
                        <span className="text-sm">{blog.likes.length}</span>

                        {blog.likes.includes(user._id) ? (
                        <ThumbsUp size={17}   className="text-red-600"/>
                          
                        ) : (
                           <ThumbsUp size={17} color="gray" />
                        )}
                      </button>
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
                        className="mt-2 cursor-pointer sm:mt-0 sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 bg-[rgba(138,99,247,1)] text-white px-3 py-2 rounded-xl text-sm w-full sm:w-auto"
                      >
                        <span className="sm:hidden">Submit Comment</span>
                        <span className="hidden sm:inline">Enter a Comment</span>
                      </button>
                    </form>
                  </div>

                  {/* Display existing comments */}
                  {blog.comments.length > 0 && (
                    <div className="bg-white p-3 sm:p-4 rounded-xl space-y-4">
                      {blog.comments.map((comment) => (
                        <div
                          key={comment._id}
                          className="py-2 bg-[rgba(188,178,218,0.3)] p-3 rounded-xl"
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
                            <div className="flex items-center gap-2">
                              <img
                                src={comment.user.profilePicture}
                                alt="Profile"
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                              />
                              <p className="text-sm sm:text-base font-medium">
                                {comment.user.fullName}
                              </p>
                            </div>
                            <div className="flex gap-2 items-center self-start sm:self-auto">
                              <button
                                onClick={() => handleDeleteComment(comment._id)}
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
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right column - author info and other posts */}
            <div className="w-full xl:max-w-[400px] space-y-6">
              <div className="bg-[rgba(196,192,207,0.1)]  rounded-xl grid grid-cols-1 gap-5 pt-5 w-full shadow-lg/30">
                <h3 className="text-lg px-3 font-semibold">
                  {blog.author.fullName}
                </h3>
                <hr className="text-gray-300" />
                {otherBlogs.length > 0 && (
                  <div className="space-y-6 ">
                    {otherBlogs.map((otherBlog) => (
                      <div key={otherBlog._id} className="w-full ">
                        <img
                          src={otherBlog.image}
                          alt="Blog"
                          className="object-cover w-full h-48 sm:h-56 rounded-t-lg"
                        />
                        <div className="rounded-b-lg flex flex-col w-full gap-4 p-4 sm:p-6 bg-white">
                          <div className="space-y-2">
                            <h3 className="font-bold text-lg sm:text-xl leading-tight">
                              {otherBlog.title}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
                              {otherBlog.description.substring(0, 150)}
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 sm:items-center">
                            <p className="bg-[rgba(188,178,218,0.3)] py-1 px-3 text-center sm:px-5 rounded-full cursor-pointer text-sm w-fit hover:bg-[rgba(188,178,218,0.5)] transition-colors">
                              {otherBlog.tag}
                            </p>
                            <Link to={`/blog/${otherBlog._id}`}>
                              <p className="text-[rgba(142,142,142,1)] underline text-sm hover:text-blue-600 cursor-pointer">
                                Read more
                              </p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewingPost;
