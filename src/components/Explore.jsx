import React from "react";
import { explores } from "../Data/explore";
const Explore = () => {
  return (
    <div id="explore" className="bg-[rgba(196,192,207,0.1)]">
      <div className=" container mx-auto w-11/12 py-14 flex flex-col gap-10">
        <h1 className="text-center font-bold text-2xl md:text-4xl container mx-auto w-11/12">
          Explore Categories
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {explores.map((explore, index) => {
            return (
              <div key={index} className="bg-white p-5 rounded-2xl flex flex-col gap-5 items-center text-center">
                <img
                  className="bg-[rgba(196,192,207,0.1)] p-5 rounded-[50%]"
                  src={explore.exploreicon}
                  alt=""
                />
                <h3>{explore.exploreheading}</h3>
                <p>{explore.exploretext}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Explore;
