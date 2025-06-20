import React from "react";
import Navbar3 from "../components/Navbar3";
import createimg from "../assets/Frame 2147223357.png";
import { posts } from "../Data/posts";

const CreatePostPreview = () => {
  return (
    <div>
      <Navbar3 />
      <p className="container mx-auto w-11/12 text-gray-400 text-sm sm:text-base my-4 pt-4">
        Preview in Bibian...
      </p>
      <div className="container mx-auto w-11/12 px-4 sm:px-6 lg:px-8 py-2 max-w-5xl">
        <div className="p-3 rounded-xl space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            Tom's Redemption
          </h1>

          <div>
            <p className="text-gray-400 text-base sm:text-lg mb-1">
              A Story of Pain, Secrets, and the Long Road to Healing
            </p>
            <h3 className="font-semibold text-lg sm:text-xl">By Bibian Eze</h3>
          </div>
        </div>

        <div className="my-7">
          <img
            src={createimg}
            alt="Story illustration"
            className="rounded-xl w-full object-cover"
          />
        </div>

        <div className="my-5 w-full space-y-10">
          {posts.map((post) => {
            const sentences = post.content.split(/(?<=\.)\s+/);
            const grouped = [];
            for (let i = 0; i < sentences.length; i += 3) {
              grouped.push(sentences.slice(i, i + 3).join(" "));
            }

            return (
              <article key={post.id} className="space-y-4">
                <h3 className="font-semibold text-xl sm:text-2xl">
                  {post.title}
                </h3>
                {grouped.map((para, index) => (
                  <p
                    key={index}
                    className="my-3 text-gray-700 leading-relaxed text-base sm:text-lg"
                  >
                    {para}
                  </p>
                ))}
              </article>
            );
          })}

          {posts.length > 0 && (
            <p className="font-bold mt-6 text-lg sm:text-xl">
              To be continued...
            </p>
          )}
        </div>

        <div className="space-y-14 max-w-3xl  sm:text-left">
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold">If You’re Still Reading…</h3>
            <p>Thank you</p>
            <p className="mx-auto sm:mx-0 max-w-xl">
              This story is fiction, but for many, the wounds are real. If this
              touched you, helped you, or reminded you of someone, please share
              it.
            </p>
            <p>You never know who needs to read this today.</p>
          </div>

          <div className="mx-auto sm:mx-0 max-w-md text-gray-600 text-sm sm:text-base">
            #MentalHealth #FamilyTrauma #RedemptionStories #Fiction
            #AfricanNarratives #EmotionalHealing #DarkRomance #TherapyJourney
            #ComingOfAge #TomysRedemption
          </div>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-start gap-3 py-10">
          {["Fiction", "Trauma", "Healing", "Dark Fiction", "Hope"].map(
            (tag, idx) => (
              <span
                key={idx}
                className="bg-gray-400 py-1 px-3 rounded text-white text-sm sm:text-base"
              >
                {tag}
              </span>
            )
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 max-w-full mx-auto ">
          <button
            type="button"
            className="py-3 rounded-xl flex-1 bg-gray-900 text-white text-base font-semibold transition hover:bg-gray-800 "
          >
            Continue editing
          </button>
          <button
            type="submit"
            className="py-3 rounded-xl flex-1 text-white bg-[rgba(138,99,247,1)] text-base font-semibold transition hover:bg-purple-700"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPreview;
