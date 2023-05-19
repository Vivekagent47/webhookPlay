import React from "react";
import Add from "../../assets/Add";
import Destination from "./Destination";
import { useQuery } from "react-query";
import CreateDestination from "./CreateDestination";
import Spinner from "../../components/Spinner";
import { fetchDestinations } from "../../api/destination";
import { DestinationType, IDestination } from "../../types";
import ErrorMeessage from "../../components/ErrorMeessage";

const Destinations = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const { isLoading, isError, data, isFetching } = useQuery(
    "destinations",
    fetchDestinations,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
      refetchInterval: false,
      select: (data) => (data?.data ? data.data : []) as IDestination[],
    }
  );

  return (
    <div className="mx-8 mt-8">
      <div className="flex items-center justify-between mb-7">
        <p className="text-2xl text-slate-900 font-semibold">Destinations</p>
        <button
          className="bg-blue-600 text-white rounded-md px-4 py-2 flex items-center"
          onClick={() => setIsOpen(() => true)}
        >
          <span className="mr-2">Create Destination</span>
          <Add />
        </button>
      </div>
      <div className="w-full border-b border-bw-200" />
      <div className="mt-8">
        {isLoading || isFetching ? (
          <div className="flex justify-center items-center h-96">
            <Spinner />
          </div>
        ) : isError ? (
          <ErrorMeessage />
        ) : (
          <div>
            {data?.map(
              (s: {
                name: string;
                id: string;
                account_id: string;
                type: DestinationType;
                url: string;
              }) => (
                <Destination
                  key={s.id}
                  name={s.name}
                  id={s.id}
                  type={s.type}
                  url={s.url}
                />
              )
            )}
          </div>
        )}
      </div>
      <CreateDestination isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Destinations;
