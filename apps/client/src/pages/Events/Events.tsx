import React from "react";
// import Retry from "../../assets/Retry";
import Refresh from "../../assets/Refresh";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { IEvent } from "../../types";
import { getEventByDestinationId, getEvents } from "../../api/events";
import PaginationBox from "../../components/PaginationBox";
import ErrorMeessage from "../../components/ErrorMeessage";

const Events = () => {
  const queryClient = useQueryClient();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [events, setEvents] = React.useState<IEvent[]>([]);
  const [totalPage, setTotalPage] = React.useState(2);
  const [page, setPage] = React.useState(1);

  const nextPage = () => {
    if (page < totalPage) {
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
      params.get("destination_id")
        ? `event_by_destination_id_${page}`
        : `events_${page}`,
    ],
    () => {
      const destination_id = params.get("destination_id");
      if (destination_id) {
        return getEventByDestinationId(destination_id, page);
      } else {
        return getEvents(page);
      }
    },
    {
      refetchInterval: 1000 * 60 * 2,

      onSuccess: (data) => {
        setEvents((data?.data ? data.data : []) as IEvent[]);
        setTotalPage(data?.headers["x-total-page"] || 1);
      },
    }
  );

  const handleRefresh = () => {
    queryClient.invalidateQueries([
      params.get("destination_id")
        ? `event_by_destination_id_${page}`
        : `events_${page}`,
    ]);
  };

  return (
    <div className="mx-8 mt-8">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center">
          <p className="text-2xl text-slate-900 font-semibold mr-3">Events</p>
        </div>
        <div className="flex items-center">
          {/* <button className="bg-bg text-bw-700 border border-bw-700 rounded-md px-4 py-2 flex items-center mr-2">
            <Retry />
            <span className="text-sm ml-2">Bulk Retry</span>
          </button> */}
          <button
            className="bg-white text-slate-900 border border-slate-900 rounded-md px-4 py-2 flex items-center"
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
          <div className="flex flex-col w-full items-center justify-between rounded transition">
            {events?.map((item: IEvent) => {
              return (
                <div
                  key={item.id}
                  onClick={() => navigate(`/event/${item.id}`)}
                  className="flex w-full items-center cursor-pointer rounded justify-between hover:bg-slate-100"
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
                    {item.destination.name}
                  </div>
                  <div className="px-6 py-4 text-sm text-slate-800 font-medium text-right whitespace-nowrap">
                    {new Date(item.created_at).toLocaleDateString() +
                      " " +
                      new Date(item.created_at).toLocaleTimeString()}
                  </div>
                </div>
              );
            })}
            <div className="flex w-full justify-end mb-8">
              <PaginationBox
                currentPage={page}
                lastPage={totalPage}
                nextPage={nextPage}
                prvPage={prevPage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
