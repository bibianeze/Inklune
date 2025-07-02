import React, { useRef, useState } from "react";
import LoggedInNavbar from "../components/LoggedInNavbar";
import { homeprofile } from "../Data/homeprofile";
import { ArrowRight, ArrowLeft, X, Ellipsis } from "lucide-react";
import HomePosts from "../components/HomePosts";
import { featured } from "../Data/featured";
import FollowingPosts from "../components/FollowingPosts";
import { useBlogContext } from "../hooks/useBlogContext";
import { Link } from "react-router-dom";
import moment from "moment";
const HomePageLoggedIn = () => {
   const { isLoading, blogs } = useBlogContext();
  const scrollRef = useRef(null);
  const [cards, setCards] = useState(homeprofile);
  const [showFollowing, setShowFollowing] = useState(false);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 300;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleDelete = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div>
      <LoggedInNavbar />
      <div className="container mx-auto w-11/12 py-6">
        {/* Navigation Buttons */}
        <div className="flex flex-wrap gap-3 mb-4">
          {["Home", "Popular", "Recommended"].map((text, idx) => (
            <button
              key={idx}
              className={`hover:bg-purple-300 hover:py-1 hover:px-2 hover:rounded-lg hover:text-white ${
                (text === "Following" && showFollowing) ||
                (text === "Home" && !showFollowing)
                  ? "bg-purple-400 p-2 text-white rounded-lg"
                  : ""
              }`}
              onClick={() => setShowFollowing(text === "Following")}
            >
              {text}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-500 text-white p-2 rounded-full shadow-md"
            onClick={() => scroll("left")}
          >
            <ArrowLeft />
          </button>

          <div
            className="flex overflow-x-scroll no-scrollbar scroll-smooth space-x-4"
            ref={scrollRef}
          >
            {blogs.slice(0,7).map((homep) => (
              <div
                key={homep._id}
                className="flex-shrink-0 w-[300px] sm:w-[250px] md:w-[300px] h-[400px] rounded-lg shadow-lg bg-cover bg-center text-white flex items-end relative"
                style={{
                  backgroundImage: `url(${homep.image})`
                }}
              >
                <button
                  onClick={() => handleDelete(homep._id)}
                  className="absolute top-0 right-0 p-2 bg-opacity-50 hover:bg-opacity-80 rounded-full"
                >
                  <X />
                </button>

                <div className="bg-black/30 backdrop-blur-xs rounded text-white w-full p-3 flex flex-col justify-between h-[40vh]">
                  <div className="space-y-4 w-[200px]">
                    <h1 className="text-2xl">{homep.author.fullName}</h1>
                    <Link to={`/blog/${homep._id}`}><p>{homep.description.substring(0, 100)}</p></Link>
                    
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p>{moment(homep.createdAt).format("MMM Do")}</p>
                    <Ellipsis />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-500 text-white p-2 rounded-full shadow-md"
            onClick={() => scroll("right")}
          >
            <ArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 ">
            {showFollowing ? <FollowingPosts /> : <HomePosts />}
          </div>

          <div className="flex flex-col gap-7 md:mt-19">
            <div className="bg-[rgba(196,192,207,0.1)] p-4 rounded">
              <h3 className="font-semibold text-xl md:text-2xl mb-6">
                Upgrade to Premium
              </h3>
              <p>
                Want the full story? Become a member and explore all of inklune
              </p>
              <button className="mt-2 px-4 py-1 bg-purple-600 text-white rounded-xl">
                Upgrade
              </button>
            </div>



            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageLoggedIn;
