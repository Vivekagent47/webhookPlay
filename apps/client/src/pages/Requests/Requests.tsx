import React from "react";
// import Retry from "../../assets/Retry";
import Refresh from "../../assets/Refresh";
import Request from "./Request";
import { useQuery, useQueryClient } from "react-query";
import { useSearchParams } from "react-router-dom";
import { getRequestBySourceId, getRequests } from "../../api/requests";
import Spinner from "../../components/Spinner";
import { IRequest } from "../../types";
import ErrorMeessage from "../../components/ErrorMeessage";

const Requests = () => {
  const queryClient = useQueryClient();
  const [params] = useSearchParams();
  const [isOpen, setIsOpen] = React.useState("");
  const [openData, setOpenData] = React.useState<IRequest | null>(null);
  const [requests, setRequests] = React.useState<IRequest[]>([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [page, setPage] = React.useState(1);

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      handleRefresh();
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      handleRefresh();
    }
  };

  const { isLoading, isError, isFetching } = useQuery(
    [
      params.get("source_id")
        ? `requests_by_source_id_${page}`
        : `requests_${page}`,
    ],
    () => {
      const source_id = params.get("source_id");
      if (source_id) {
        return getRequestBySourceId(source_id, page);
      } else {
        return getRequests(page);
      }
    },
    {
      refetchInterval: 1000 * 60 * 2,
      onSuccess: (data) => {
        setRequests((data?.data ? data.data : []) as IRequest[]);
        setTotalPages(data?.headers["x-total-page"] || 1);
      },
    }
  );

  const handleRefresh = () => {
    queryClient.invalidateQueries([
      params.get("source_id")
        ? `requests_by_source_id_${page}`
        : `requests_${page}`,
    ]);
  };

  return (
    <div
      className={`flex justify-between h-full items-start gap-4 ml-8 ${
        isOpen ? "" : "mr-8"
      }`}
    >
      <div className="flex-1 mt-8">
        <div className="flex w-auto items-center justify-between mb-7">
          <div className="flex items-center">
            <p className="text-2xl text-slate-900 font-semibold mr-3">
              Requests
            </p>
          </div>
          <div className="flex items-center">
            {/* <button className="bg-white text-slate-700 border border-slate-700 rounded-md px-4 py-2 flex items-center mr-2">
              <Retry />
              <span className="text-sm ml-2">Bulk Retry</span>
            </button> */}
            <button
              className="bg-white text-slate-700 border border-slate-700 rounded-md px-4 py-2 flex items-center"
              onClick={() => {
                handleRefresh();
              }}
            >
              <Refresh />
              <span className="text-sm ml-2">Refresh</span>
            </button>
          </div>
        </div>
        <div className="w-full border-b border-slate-200" />
        <div className="mt-8">
          {isLoading || isFetching ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : isError ? (
            <ErrorMeessage />
          ) : (
            <Request
              requests={requests || []}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setOpenData={setOpenData}
              page={page}
              totalPage={totalPages}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          )}
        </div>
      </div>
      {isOpen && openData && (
        <div className="w-80 overflow-y-scroll sticky top-0 h-screen border-l-[1px] border-l-slate-200 px-2">
          <div className="flex items-center justify-between my-4">
            <p className="text-xl text-slate-900 font-semibold">
              Request Details
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 mb-2">
            <p className="text-base text-gray-900 font-bold">Headers</p>
            <div className="flex flex-col w-full border-[1px] border-slate-300 rounded">
              {Object.entries(openData.headers).map(([key, value], index) => (
                <div
                  key={key}
                  className={`flex p-2 items-start justify-between hover:bg-slate-100 gap-2 ${
                    index !== Object.entries(openData.headers).length - 1 &&
                    "border-b-[1px] border-slate-300"
                  }`}
                >
                  <div className=" font-extrabold text-sm">{key}</div>
                  <div className="truncate text-slate-600 text-sm">{value}</div>
                </div>
              ))}
            </div>

            <p className="text-base text-slate-900 font-bold mt-4">Response</p>
            <div className="flex flex-col w-full border-[1px] border-slate-300 rounded">
              <pre className="text-sm text-slate-600 overflow-x-scroll p-2">
                <code>{JSON.stringify(openData.body || {}, null, 2)}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
