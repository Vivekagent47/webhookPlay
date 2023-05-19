import React from "react";
import Copy from "../../assets/Copy";

const Fourth = () => {
  const [destination, setDestination] = React.useState<string>("");

  return (
    <>
      <p className="text-4xl font-bold text-primary-300">just about there</p>
      <p className="text-4xl mt-2 font-bold text-primary-button">
        Create Destination
      </p>
      <div className="mt-11">
        <p className="text-sm text-primary-500">Name</p>
        <input
          className="w-full bg-bw-100 p-3.5 rounded-md border border-primary-200 mt-2.5"
          name="destination"
          value={destination || ""}
          onChange={(e) => setDestination(e.target.value)}
        />
        <p className="text-sm text-primary-500 mt-7">Destination Link</p>
        <div className="flex justify-between items-center bg-bw-100 p-3.5 rounded-md border border-primary-200 mt-2.5">
          <p className="text-bw-700">https/askjdhjaskjdnka.sjdn/ajj</p>
          <Copy />
        </div>
      </div>
    </>
  );
};

export default Fourth;
