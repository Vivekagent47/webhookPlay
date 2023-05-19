import React from "react";
import { useQuery } from "react-query";
import { getEventByRequestId } from "../../api/events";
import { IEvent } from "../../types";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";

interface IProps {
  request_id: string;
}

const RequestEvents = ({ request_id }: IProps) => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery(
    `request_events-${request_id}`,
    () => {
      return getEventByRequestId(request_id);
    },
    {
      refetchOnWindowFocus: false,
      retry: 2,
      select: (data) => (data?.data ? data.data : []) as IEvent[],
    }
  );

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-auto">
          <Spinner />
        </div>
      )}
      {error && (
        <div
          className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
          role="alert"
        >
          <svg
            aria-hidden="true"
            className="flex-shrink-0 inline w-5 h-5 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">
              Unable to fetch data. Refresh page or try sometime later.
            </span>
          </div>
        </div>
      )}
      {data && (
        <>
          <div className="flex flex-col w-full items-center justify-between bg-slate-200 rounded transition">
            {data?.map((item: IEvent) => {
              return (
                <div
                  key={item.id}
                  onClick={() => navigate(`/event/${item.id}`)}
                  className="flex w-full items-center rounded justify-between cursor-pointer bg-slate-200"
                >
                  <div
                    className={`px-6 py-4 text-sm text-slate-50 w-[150px] flex items-center text-center justify-center whitespace-nowrap`}
                  >
                    <div
                      className={`rounded p-2 w-full ${
                        item.status_type === "success"
                          ? "bg-[#4caf50]"
                          : item.status_type === "error"
                          ? "bg-[#f44336]"
                          : "bg-amber-500"
                      }`}
                    >
                      {item.status_code === 0 ? "PAUSED" : item.status_code}
                    </div>
                  </div>
                  <div className="px-6 flex-1 py-4 text-sm text-slate-800 whitespace-nowrap">
                    {item.id}
                  </div>
                  <div className="px-6 flex-1 py-4 text-sm text-slate-800 whitespace-nowrap">
                    {item.request.source.name} → {item.destination.name}
                  </div>
                  <div className="px-6 py-4 text-sm text-slate-800 font-medium text-right whitespace-nowrap">
                    {new Date(item.created_at).toLocaleDateString() +
                      " " +
                      new Date(item.created_at).toLocaleTimeString()}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default RequestEvents;
