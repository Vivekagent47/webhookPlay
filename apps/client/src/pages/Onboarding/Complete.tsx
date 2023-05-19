import React from "react";

const Complete = () => {
  return (
    <>
      <p className="text-4xl font-bold text-primary-300">you&apos;re all set</p>
      <p className="text-4xl mt-2 font-bold text-primary-button">
        Congratulations!!!
      </p>
      <div className="mt-11">
        <p className="text-sm text-primary-500">CLI</p>
        <div className="flex justify-between items-center bg-bw-100 p-3.5 rounded-md border border-primary-200 mt-2.5">
          <p className="text-bw-700">Go to Dashboard</p>
        </div>
        <p className="text-sm text-primary-500 mt-7">API KEY</p>
        <div className="flex justify-between items-center bg-bw-100 p-3.5 rounded-md border border-primary-200 mt-2.5">
          <p className="text-bw-700">Documentation</p>
        </div>
        <p className="text-sm text-primary-500 mt-7">Help</p>
      </div>
    </>
  );
};

export default Complete;
