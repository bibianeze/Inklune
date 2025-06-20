import React, { useRef, useState } from "react";
import LoggedInNavbar from "../components/LoggedInNavbar";
import { homeprofile } from "../Data/homeprofile";
import { ArrowRight, ArrowLeft, X, Ellipsis } from "lucide-react";
import HomePosts from "../components/HomePosts";
import { featured } from "../Data/featured";
import FollowingPosts from "../components/FollowingPosts";

const HomePageLoggedIn = () => {
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
          {["Home", "Following", "Popular", "Recommended"].map((text, idx) => (
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
            {cards.map((homep) => (
              <div
                key={homep.id}
                className="flex-shrink-0 w-[300px] sm:w-[250px] md:w-[300px] h-[400px] rounded-lg shadow-lg bg-cover bg-center text-white flex items-end relative"
                style={{
                  backgroundImage:
                    "url('https://images.squarespace-cdn.com/content/v1/537cad0be4b02cb9fe04985f/1438704698248-TWKUDI932Y2VXOXNAUCJ/Writing.jpg?format=2500w')",
                }}
              >
                <button
                  onClick={() => handleDelete(homep.id)}
                  className="absolute top-0 right-0 p-2 bg-opacity-50 hover:bg-opacity-80 rounded-full"
                >
                  <X />
                </button>

                <div className="bg-black/30 backdrop-blur-xs rounded text-white w-full p-3 flex flex-col justify-between h-[40vh]">
                  <div className="space-y-4 w-[200px]">
                    <h1 className="text-2xl">{homep.author}</h1>
                    <p>{homep.content}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p>{homep.time}</p>
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

            <div className="bg-[rgba(196,192,207,0.1)] p-4 rounded ">
              <h3 className="font-semibold text-xl md:text-2xl mb-6">
                Featured Writers
              </h3>
              {featured.map((feature, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-5 gap-2 flex-wrap"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      src={feature.image}
                      alt=""
                    />
                    <div className="text-sm">
                      <h3 className="font-semibold">
                        {feature.featuredAuthor}
                      </h3>
                      <p className="text-gray-600">{feature.Ftitle}</p>
                    </div>
                  </div>
                  <button
                    className="bg-[rgba(188,178,218,0.3)] py-1 px-4 rounded-xl text-sm"
                    onClick={() => setShowFollowing(true)}
                  >
                    Follow
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-[rgba(196,192,207,0.1)] p-4 rounded">
              <h3 className="font-semibold mb-2">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "#WritingLife",
                  "#CreativeProcess",
                  "#Poetry",
                  "#Love",
                  "#VentureCapital",
                  "#Inspiration",
                  "#LitaryLife",
                  "#TraumaHealing",
                  "#Gaming",
                  "#WritingTips",
                  "#Fiction",
                ].map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[rgba(188,178,218,0.3)] p-1 px-3 rounded-xl text-sm cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageLoggedIn;
