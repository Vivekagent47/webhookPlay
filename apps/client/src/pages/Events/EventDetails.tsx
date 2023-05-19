import React from "react";
import toast from "react-hot-toast";
import Retry from "../../assets/Retry";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getEventById } from "../../api/events";
import Spinner from "../../components/Spinner";
import { IEvent, IAttempt } from "../../types";
import EventAttempts from "./EventAttempts";
import { retryAttempt } from "../../api/attempt";
import ErrorMeessage from "../../components/ErrorMeessage";

const EventDetails = () => {
  const queryClient = useQueryClient();
  const { id = "" } = useParams();
  const [openAttempt, setOpenAttempt] = React.useState(false);
  const [attemptData, setAttemptData] = React.useState<IAttempt | null>(null);

  const { data, isLoading, isError } = useQuery(
    `event_detail_${id}`,
    () => {
      return getEventById(id || "");
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      select: (data) => (data?.data ? data.data : {}) as IEvent,
    }
  );

  const handleRetryAttempt = useMutation(
    ({ event_id, request_id }: { event_id: string; request_id: string }) => {
      return retryAttempt(event_id, request_id);
    },
    {
      onSuccess: () => {
        toast.success("Attempt retried successfully");
        queryClient.invalidateQueries(`event_detail_${id}`);
        queryClient.invalidateQueries(`event_attempts_${id}`);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      },
    }
  );

  return (
    <div
      className={`flex justify-between h-full items-start gap-4 ml-8 ${
        openAttempt ? "" : "mr-8"
      }`}
    >
      <div className="flex-1 mt-8">
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center">
            <p className="text-2xl text-slate-900 font-semibold mr-3">
              Events Details
            </p>
          </div>
          <div className="flex items-center">
            <button
              className="bg-white text-slate-900 border border-slate-900 rounded-md px-4 py-2 flex items-center mr-2"
              onClick={() => {
                handleRetryAttempt.mutate({
                  event_id: data?.id || "",
                  request_id: data?.request_id || "",
                });
              }}
            >
              <Retry />
              <span className="text-sm ml-2">Retry</span>
            </button>
          </div>
        </div>
        <div className="w-full border-b border-slate-200" />
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : isError ? (
          <ErrorMeessage />
        ) : (
          <div className="mt-4">
            <div className="flex flex-wrap w-full items-center gap-y-4">
              <div className="w-full md:w-1/2">
                <div className="flex w-full justify-evenly items-center">
                  <p className="text-base flex-1 text-slate-900 font-semibold mr-3">
                    Event Status
                  </p>
                  <div
                    className={`text-sm flex-1 text-slate-50 flex items-center text-center justify-start whitespace-nowrap`}
                  >
                    <div
                      className={`rounded py-1 px-3 ${
                        data?.status_type === "success"
                          ? "bg-[#4caf50]"
                          : data?.status_type === "error"
                          ? "bg-[#f44336]"
                          : "bg-amber-500"
                      }`}
                    >
                      {data?.status_code === 0 ? "PAUSED" : data?.status_code}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex w-full justify-evenly items-center">
                  <p className="text-base flex-1 text-slate-900 font-semibold mr-3">
                    Event Id
                  </p>
                  <p className="text-sm flex-1 text-slate-700 font-semibold mr-3">
                    {data?.id}
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex w-full justify-evenly items-center">
                  <p className="text-base flex-1 text-slate-900 font-semibold mr-3">
                    Connection
                  </p>
                  <p className="text-sm flex-1 text-slate-700 font-semibold mr-3">
                    {data?.request.source.name} → {data?.destination.name}
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex w-full justify-evenly items-center">
                  <p className="text-base flex-1 text-slate-900 font-semibold mr-3">
                    Destination Type
                  </p>
                  <p className="text-sm flex-1 text-slate-700 uppercase font-semibold mr-3">
                    {data?.destination.type}
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex w-full justify-evenly items-center">
                  <p className="text-base flex-1 text-slate-900 font-semibold mr-3">
                    Request Id
                  </p>
                  <p className="text-sm flex-1 text-slate-700 font-semibold mr-3">
                    {data?.request_id}
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex w-full justify-evenly items-center">
                  <p className="text-base flex-1 text-slate-900 font-bold mr-3">
                    Created At
                  </p>
                  <p className="text-sm flex-1 text-slate-700 font-semibold mr-3">
                    {new Date(data?.created_at || "").toLocaleString() || "-"}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full border-b border-slate-200 my-8" />
            <div className="w-full">
              <div className="flex items-center justify-between my-4">
                <p className="text-xl text-slate-900 font-semibold">
                  Request Details
                </p>
              </div>

              <div className="flex flex-col items-start gap-2 mb-2">
                <p className="text-base text-gray-900 font-bold">Headers</p>
                <div className="flex flex-col w-full border-[1px] border-slate-300 rounded">
                  {Object.entries(data?.request.headers || {}).map(
                    ([key, value], index) => (
                      <div
                        key={key}
                        className={`flex p-2 items-start justify-between hover:bg-slate-100 gap-2 ${
                          index !==
                            Object.entries(data?.request.headers || {}).length -
                              1 && "border-b-[1px] border-slate-300"
                        }`}
                      >
                        <div className="flex-1 font-extrabold text-sm">
                          {key}
                        </div>
                        <div className="flex-1 truncate text-slate-600 text-sm">
                          {value}
                        </div>
                      </div>
                    )
                  )}
                </div>

                <p className="text-base text-slate-900 font-bold mt-4">
                  Response
                </p>
                <div className="flex flex-col w-full border-[1px] border-slate-300 rounded">
                  <pre className="text-sm text-slate-600 overflow-x-scroll p-2">
                    <code>
                      {JSON.stringify(data?.request.body || {}, null, 2)}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        <EventAttempts
          event_id={id}
          setAttemptData={setAttemptData}
          setOpenAttempt={setOpenAttempt}
        />
      </div>
      {openAttempt && attemptData && (
        <div className="w-96 overflow-y-scroll sticky top-0 h-screen border-l-[1px] border-l-slate-200 px-2">
          <div className="flex items-center justify-between my-4">
            <p className="text-xl text-slate-900 font-semibold">
              Attempt Details
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 mb-2">
            <p className="text-base text-gray-900 font-bold">Status</p>
            <div
              className={`py-2 text-sm text-slate-50 flex items-center text-center justify-center whitespace-nowrap`}
            >
              <div
                className={`rounded p-2 px-8 w-full ${
                  attemptData.status_type === "success"
                    ? "bg-[#4caf50]"
                    : attemptData.status_type === "error"
                    ? "bg-[#f44336]"
                    : "bg-amber-500"
                }`}
              >
                {attemptData.status_code === 0
                  ? "PAUSED"
                  : attemptData.status_code}
              </div>
            </div>

            <p className="text-base text-slate-900 font-bold mt-4">
              Request URL
            </p>
            <div className="flex flex-col w-full rounded">
              <p className="text-sm text-slate-600 overflow-x-scroll p-2">
                {data?.destination.url}
              </p>
            </div>

            {attemptData.status_type !== "pause" && (
              <>
                <p className="text-base text-slate-900 font-bold mt-4">
                  Response
                </p>
                <div className="flex flex-col w-full border-[1px] border-slate-300 rounded">
                  <pre className="text-sm text-slate-600 overflow-x-scroll p-2">
                    <code>
                      {JSON.stringify(attemptData.response || {}, null, 2)}
                    </code>
                  </pre>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
