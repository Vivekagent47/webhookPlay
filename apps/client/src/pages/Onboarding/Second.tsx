import React from "react";

const Second = () => {
  const [source, setSource] = React.useState<string>("");

  return (
    <>
      <p className="text-4xl font-bold text-primary-300">create your</p>
      <p className="text-4xl mt-2 font-bold text-primary-button">
        First Source
      </p>
      <div className="mt-11">
        <p className="text-sm text-primary-500">Name</p>
        <input
          className="w-full bg-bw-100 p-3.5 rounded-md border border-primary-200 mt-2.5"
          name="source"
          value={source || ""}
          onChange={(e) => setSource(e.target.value)}
        />
      </div>
    </>
  );
};

export default Second;
