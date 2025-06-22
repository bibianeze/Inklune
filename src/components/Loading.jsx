import React from "react";
import { BounceLoader } from "react-spinners";

const Loading = ({ height }) => {
  return (
    <div
      style={{ height: height ? height : "100vh" }}
      className={`flex items-center justify-center`}
    >
      <div className="flex items-center gap-3">
        <BounceLoader color="#8A63F7" />
        <div className="flex gap-2 items-center">
          <div>
            <h2 className="font-medium text-lg lg:text-xl ">Inklune</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
