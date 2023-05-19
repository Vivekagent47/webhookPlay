import React from "react";

interface IProps {
  currentPage: number;
  lastPage: number;
  nextPage: () => void;
  prvPage: () => void;
}

const PaginationBox = ({
  currentPage,
  lastPage,
  prvPage,
  nextPage,
}: IProps) => {
  return (
    <div className="border rounded border-[#CBCBCB] flex items-center justify-center w-fit float-right mt-2">
      <div
        className="flex items-center justify-center w-fit px-3 py-1 cursor-pointer"
        onClick={() => prvPage()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
        >
          <path
            d="M7 13L1 7L7 1"
            stroke="#0E0E0E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="border-x border-[#CBCBCB] px-3 py-1">
        <span className="text-[#0E0E0E]">{currentPage}</span>
        <span className="text-[#858585]">/</span>
        <span className="text-[#858585]">{lastPage}</span>
      </div>
      <div
        className="flex items-center justify-center w-fit px-3 py-1 cursor-pointer"
        onClick={() => nextPage()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
        >
          <path
            d="M1 13L7 7L1 1"
            stroke="#0E0E0E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default PaginationBox;
