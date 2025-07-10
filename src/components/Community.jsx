import React, { useState } from "react";
import { community } from "../Data/community";
import { featured } from "../Data/featured";
import { Heart } from "lucide-react";
import { MessageSquareText } from "lucide-react";
import JoinDiscussionModal from "./JoinDiscussionModal"; // Modal component

const Community = () => {
  const [showModal, setShowModal] = useState(false);
  // Track liked and commented posts by their id
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentedPosts, setCommentedPosts] = useState([]);
  // Track followed users by their index or id
  const [followedUsers, setFollowedUsers] = useState([]);

  // Add user authentication state - set to false to simulate non-logged-in user
  // Change this to true or connect to your actual auth system
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle like click
  const handleLike = (postId) => {
    if (!likedPosts.includes(postId)) {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  // Handle comment click
  const handleComment = (postId) => {
    if (!commentedPosts.includes(postId)) {
      setCommentedPosts([...commentedPosts, postId]);
    }
  };

  // Handle follow click
  const handleFollow = (userIndex) => {
    if (!isLoggedIn) {
      return; // Do nothing if user is not logged in
    }

    if (followedUsers.includes(userIndex)) {
      // Unfollow - remove from followed users
      setFollowedUsers(followedUsers.filter((id) => id !== userIndex));
    } else {
      // Follow - add to followed users
      setFollowedUsers([...followedUsers, userIndex]);
    }
  };

  return (
    <div id="community" className="container mx-auto w-11/12 py-12">
      <div className="py-14 flex flex-col gap-10">
        <h1 className="text-center font-bold text-2xl md:text-4xl">
          Community Voices
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Trending Discussions */}
          <div className="lg:w-full bg-[rgba(196,192,207,0.1)] rounded-xl p-4">
            <h1 className="font-semibold text-2xl md:text-3xl mb-6">
              Trending Discussions
            </h1>

            {community.map((comm) => (
              <div
                key={comm.id}
                className="rounded-xl p-5 bg-white my-5 shadow-sm"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Image */}
                  <div>
                    <img
                      className="object-cover rounded-lg"
                      src={comm.image}
                      alt=""
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <div className="flex justify-between flex-wrap">
                      <div>
                        <h3 className="font-semibold">{comm.author}</h3>
                        <p className="text-sm text-gray-500">{comm.duration}</p>
                      </div>
                      <button className="bg-[rgba(188,178,218,0.3)] rounded-2xl px-2  text-sm mt-2 md:mt-0">
                        {comm.tags}
                      </button>
                    </div>

                    <div className="mt-3 space-y-2">
                      <h3 className="font-semibold text-base sm:text-lg">
                        {comm.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700">
                        {comm.content}
                      </p>
                    </div>

                    {/* Icons Section */}
                    <div className="flex justify-between mt-4 flex-wrap items-center">
                      <div className="flex gap-3 items-center">
                        <button
                          disabled={likedPosts.includes(comm.id)}
                          onClick={() => handleLike(comm.id)}
                          className={`flex cursor-pointer items-center gap-1 text-gray-500 font-medium text-sm transition-opacity ${
                            likedPosts.includes(comm.id)
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:opacity-80"
                          }`}
                        >
                          <Heart size={16} />
                          <span>{comm.likes}</span>
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            Please sign in to interact
                          </span>
                        </button>

                        <button
                          disabled={commentedPosts.includes(comm.id)}
                          onClick={() => handleComment(comm.id)}
                          className={`flex items-center gap-1 text-gray-500 font-medium text-sm transition-opacity ${
                            commentedPosts.includes(comm.id)
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:opacity-80"
                          }`}
                        >
                          <MessageSquareText size={16} />
                          <span>{comm.comments}</span>
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                            Please sign in to interact
                          </span>
                        </button>
                      </div>

                      {/* Join Discussion */}
                      <button
                        onClick={() => setShowModal(true)}
                        className="text-indigo-600 cursor-pointer font-medium mt-2 md:mt-0 relative group"
                      >
                        Join discussion
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                          Please sign in to interact
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Section
          <div className="lg:w-1/3 bg-[rgba(196,192,207,0.1)] p-4 rounded-xl">
            <h2 className="font-semibold text-2xl md:text-3xl mb-6">
              Featured
            </h2>

            {featured.map((feature, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-5 gap-2 flex-wrap sm:flex-nowrap"
              >
                <div className="flex gap-4 items-center">
                  <img
                    className="w-12 h-12 object-cover rounded-full"
                    src={feature.image}
                    alt=""
                  />
                  <div className="text-sm">
                    <h3 className="font-semibold">{feature.featuredAuthor}</h3>
                    <p className="text-gray-600">{feature.Ftitle}</p>
                  </div>
                </div>
               
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* Modal Component */}
      {showModal && <JoinDiscussionModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Community;
