import React from "react";
import Copy from "../../assets/Copy";

const Third = () => {
  return (
    <>
      <p className="text-4xl font-bold text-primary-300">
        you’re building here
      </p>
      <p className="text-4xl mt-2 font-bold text-primary-button">Send Events</p>
      <div className="mt-11">
        <p className="text-sm text-primary-500">Source Link</p>
        <div className="flex justify-between items-center bg-bw-100 p-3.5 rounded-md border border-primary-200 mt-2.5">
          <p className="text-bw-700">https/askjdhjaskjdnka.sjdn/ajj</p>
          <Copy />
        </div>
      </div>
    </>
  );
};

export default Third;
