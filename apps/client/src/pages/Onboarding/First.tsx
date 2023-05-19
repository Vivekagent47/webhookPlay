import React from "react";
import Copy from "../../assets/Copy";

const First = () => {
  return (
    <>
      <p className="text-4xl font-bold text-primary-300">first things first,</p>
      <p className="text-4xl mt-2 font-bold text-primary-button">
        Download CLI
      </p>
      <div className="mt-11">
        <p className="text-sm text-primary-500">CLI</p>
        <div className="flex justify-between items-center bg-bw-100 p-3.5 rounded-md border border-primary-200 mt-2.5">
          <p className="text-bw-700">Command to Download CLI</p>
          <Copy />
        </div>
        <p className="text-sm text-primary-500 mt-7">API KEY</p>
        <div className="flex justify-between items-center bg-bw-100 p-3.5 rounded-md border border-primary-200 mt-2.5">
          <p className="text-bw-700">somekeyhere</p>
          <Copy />
        </div>
        <p className="text-sm text-primary-500 mt-7">CLI DOCS</p>
        <p className="text-sm text-primary-600 mt-3 underline">
          https://linklinklinklink.com
        </p>
      </div>
    </>
  );
};

export default First;
