import React from "react";
import { useQuery } from "react-query";
import Spinner from "../../components/Spinner";
import { getAttemptsByEventId } from "../../api/attempt";
import { IAttempt } from "../../types";
import ErrorMeessage from "../../components/ErrorMeessage";

interface IProps {
  event_id: string;
  setOpenAttempt: (openAttempt: boolean) => void;
  setAttemptData: (attemptData: IAttempt | null) => void;
}

const EventAttempts = ({
  event_id,
  setAttemptData,
  setOpenAttempt,
}: IProps) => {
  const { data, isLoading, isError } = useQuery(
    `event_attempts_${event_id}`,
    () => {
      return getAttemptsByEventId(event_id);
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      select: (data) => (data?.data ? data.data : []) as IAttempt[],
    }
  );

  return (
    <div className="my-4">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <p className="text-xl text-slate-900 font-semibold">Attempts</p>
        </div>
      </div>
      {isLoading && !data ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorMeessage />
      ) : (
        <div>
          {(data || []).map((attempt: IAttempt) => {
            return (
              <div
                key={attempt.id}
                onClick={() => {
                  setAttemptData(attempt);
                  setOpenAttempt(true);
                }}
                className="flex w-full items-center cursor-pointer rounded justify-between bg-slate-100"
              >
                <div
                  className={`px-6 py-4 text-sm text-slate-50 w-[150px] flex items-center text-center justify-center whitespace-nowrap`}
                >
                  <div
                    className={`rounded p-2 w-full ${
                      attempt.status_type === "success"
                        ? "bg-[#4caf50]"
                        : attempt.status_type === "error"
                        ? "bg-[#f44336]"
                        : "bg-amber-500"
                    }`}
                  >
                    {attempt.status_code === 0 ? "PAUSED" : attempt.status_code}
                  </div>
                </div>
                <div className="px-6 flex-1 py-4 text-sm text-slate-800 whitespace-nowrap">
                  {attempt.id}
                </div>

                <div className="px-6 py-4 text-sm text-slate-800 font-medium text-right whitespace-nowrap">
                  {new Date(attempt.created_at).toLocaleDateString() +
                    " " +
                    new Date(attempt.created_at).toLocaleTimeString()}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventAttempts;
