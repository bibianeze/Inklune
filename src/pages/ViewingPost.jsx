import React from "react";
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

const ViewingPost = () => {
  const [showOptions, setShowOptions] = useState(false);
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
                <button className="bg-white flex gap-1 items-center px-2 py-1 rounded w-fit">
                  <ArrowLeft size={19} />
                  <span>back</span>
                </button>
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
                  The Silent Battles We Bring Into Love
                </h1>
                <div className="text-sm flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
                  <span className="border py-1 px-3 rounded-lg w-fit">
                    Science
                  </span>
                  <span>April 21, 2025</span>
                </div>

                {/* Article body */}
                <div>
                  <div className="space-y-5">
                    <img className="w-full rounded-lg" src={bmess} alt="" />
                    <p className="leading-relaxed text-sm sm:text-base">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Impedit reiciendis optio distinctio fuga a nihil et quo
                      minima aut error, quia sequi quaerat odio aspernatur
                      voluptatum incidunt dolor sint minus natus praesentium
                      ipsa quibusdam vel exercitationem! Est, tempora. Possimus
                      veniam fugit ipsa eaque reiciendis, dolore voluptatum
                      natus corporis laudantium delectus facilis, cupiditate vel
                      necessitatibus at a consequuntur eos doloremque? Molestias
                      ipsum dolor accusantium id expedita voluptatem. Illo
                      incidunt odio commodi, itaque adipisci aut tempora
                      dignissimos? Corporis, laborum quidem! Illo tenetur
                      quaerat nisi, vero animi maxime ducimus, culpa atque
                      repudiandae incidunt ratione placeat eum reprehenderit
                      praesentium magni, optio iusto asperiores quo doloribus
                      aperiam temporibus voluptas excepturi et? Perspiciatis
                      adipisci fugit velit numquam neque, ipsum quibusdam
                      doloribus, sed dicta dolore deserunt quae nobis
                      asperiores? Iure facilis maiores, recusandae quasi aliquid
                      alias incidunt excepturi earum ex magnam aut ullam laborum
                      quis magni veritatis quisquam! Quas eius assumenda
                      recusandae esse ratione libero odio rerum alias minus
                      inventore? Perferendis inventore suscipit nam autem id in
                      molestiae ut, totam nostrum iste at quaerat, saepe
                      accusantium! Praesentium dicta nostrum numquam magni nulla
                      ducimus, soluta iusto ab eligendi. Sint ab hic itaque quas
                      sequi corrupti vitae eligendi delectus rerum, libero
                      assumenda, aperiam dolorem commodi repellendus beatae,
                      quae nisi perferendis? Odit nostrum eaque optio explicabo
                      repudiandae! Quod eaque consequatur facilis, esse numquam
                      aliquid dolorum saepe doloremque quibusdam ut vero debitis
                      accusamus optio ipsam. Obcaecati, iste nemo vitae tempore
                      tempora illo quae voluptatem laborum, itaque voluptatibus
                      atque exercitationem rerum quod consectetur vel reiciendis
                      modi quaerat repellendus sed molestiae error possimus,
                      officia facere dignissimos modi ipsa voluptatum cumque
                      tempora sint adipisci hic illo necessitatibus nihil eos
                      repudiandae cupiditate omnis optio aperiam! Quo sunt quis
                      eum at explicabo fugiat laudantium nostrum fugit animi,
                      officia dolorem? Laborum inventore dicta sint unde fugiat
                      eius autem alias dolorum veniam delectus ipsum pariatur
                      voluptatum placeat, impedit nulla consequuntur odit
                      molestias porro repellat explicabo ipsa tempore excepturi
                      accusantium officia? Praesentium nisi explicabo delectus
                      in! Adipisci sint aliquid vel iste accusantium recusandae
                      corrupti sapiente beatae eos. Asperiores, quaerat labore?
                      Quia eos delectus, commodi, aut deserunt rerum, aliquid
                      repellendus illum eaque laborum assumenda ipsam expedita.
                      Dicta, illum! Iure labore aspernatur adipisci dolorem
                      nostrum minima facilis, omnis, incidunt voluptas saepe vel
                      explicabo cumque illum dolorum nobis numquam mollitia
                      earum nisi dicta soluta ipsa impedit! In ea tempora{" "}
                    </p>
                    <img src={tags} alt="" className="w-full" />

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
                      <form className="relative w-full">
                        <input
                          type="text"
                          className="bg-[rgba(188,178,218,0.3)] w-full border border-gray-400 px-4 py-3 pr-4 sm:pr-24 rounded-xl text-sm sm:text-base"
                          placeholder="Enter a comment"
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

                    <div className="bg-white p-3 sm:p-4 rounded-xl space-y-4">
                      {comments.map((comment) => {
                        return (
                          <div
                            key={comment.id}
                            className="py-2 bg-[rgba(188,178,218,0.3)] p-3 rounded-xl"
                          >
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
                              <div className="flex items-center gap-2">
                                <img
                                  src={comment.imgicon}
                                  alt=""
                                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                                />
                                <p className="text-sm sm:text-base font-medium">
                                  {comment.author}
                                </p>
                              </div>
                              <div className="flex gap-2 items-center self-start sm:self-auto">
                                <button className="hover:text-red-500 transition-colors">
                                  <ThumbsUp size={17} color="red" />
                                </button>
                                <button className="hover:text-red-500 transition-colors">
                                  <ThumbsDown size={17} />
                                </button>
                              </div>
                            </div>
                            <div className="border border-gray-400 bg-white p-3 sm:p-3.5 rounded-xl mt-2">
                              <p className="text-gray-600 text-sm sm:text-base">
                                {comment.comments}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full xl:max-w-[400px] space-y-6">
              {/* Author posts section */}
              <div className="bg-[rgba(196,192,207,0.1)] rounded-xl grid grid-cols-1 gap-5 py-5 w-full px-4">
                <h3 className="text-lg font-semibold">Bibian Okoro</h3>
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
