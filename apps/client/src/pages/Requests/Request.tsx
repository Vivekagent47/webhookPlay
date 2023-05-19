import React from "react";
import RequestEvents from "./RequestEvents";
import { IRequest } from "../../types";
import PaginationBox from "../../components/PaginationBox";

interface IProps {
  requests: IRequest[];
  isOpen: string;
  setIsOpen: (id: string) => void;
  setOpenData: (data: IRequest | null) => void;
  page: number;
  totalPage: number;
  nextPage: () => void;
  prevPage: () => void;
}

const Request = ({
  requests,
  isOpen,
  setIsOpen,
  setOpenData,
  page,
  totalPage,
  nextPage,
  prevPage,
}: IProps) => {
  return (
    <div className="rounded flex-1">
      {requests.map((item: IRequest) => (
        <div key={item.id} className="cursor-pointer">
          <div
            onClick={() => {
              setIsOpen(item.id);
              setOpenData(item);
            }}
            className={`flex items-center justify-between hover:bg-slate-100 rounded ${
              isOpen === item.id
                ? " shadow-md ring-1 ring-primary-button my-2"
                : ""
            }`}
          >
            {/* <div className="px-6 py-4 text-sm font-medium text-primary-500 whitespace-nowrap">
              <div className="flex items-center">
              <div className="flex items-center border border-bw-200 bg-bw-100 rounded-md px-2.5 py-1.5">
              <Check />
              <span className="ml-1.5 text-sm font-semibold">6</span>
              </div>
              <div className="flex items-center border border-bw-200 bg-bw-100 rounded-md px-2.5 py-1.5 ml-2">
              <Block />
              <span className="ml-1.5 text-sm font-semibold">0</span>
              </div>
              </div>
            </div> */}
            <div className="px-6 py-4 flex-1 text-sm text-slate-900 whitespace-nowrap">
              {item.id}
            </div>
            <div className="px-6 py-4 flex-1 text-sm text-slate-900 whitespace-nowrap">
              {item.source.name}
            </div>
            <div className="px-6 py-4 text-sm text-slate-900 font-medium text-right whitespace-nowrap">
              {new Date(item.created_at).toLocaleDateString() +
                " " +
                new Date(item.created_at).toLocaleTimeString()}
            </div>
            {/* <div className="px-6 py-4 text-sm text-bw-300 font-medium text-right">
              <Options />
            </div> */}
          </div>
          {isOpen === item.id && <RequestEvents request_id={item.id} />}
        </div>
      ))}
      <div className="flex w-full justify-end mb-8">
        <PaginationBox
          currentPage={page}
          lastPage={totalPage}
          nextPage={nextPage}
          prvPage={prevPage}
        />
      </div>
    </div>
  );
};

export default Request;
