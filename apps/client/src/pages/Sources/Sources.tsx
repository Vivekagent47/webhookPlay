import React from "react";
import Add from "../../assets/Add";
import Source from "./Source";
import { useQuery } from "react-query";
import { fetchSources } from "../../api/source";
import CreateSource from "./CreateSource";
import ErrorMeessage from "../../components/ErrorMeessage";
import Spinner from "../../components/Spinner";
import { ISource } from "../../types";

const Sources = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const { isLoading, isError, data, isFetching } = useQuery(
    "sources",
    fetchSources,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
      refetchInterval: false,
      select: (data) => (data?.data ? data.data : []) as ISource[],
    }
  );

  return (
    <div className="mx-8 mt-8">
      <div className="flex items-center justify-between mb-7">
        <p className="text-2xl text-slate-900 font-semibold">Sources</p>
        <button
          className="bg-blue-600 text-slate-50 rounded-md px-4 py-2 flex items-center"
          onClick={() => setIsOpen(() => true)}
        >
          <span className="mr-2">Create Source</span>
          <Add />
        </button>
      </div>
      <div className="w-full border-b border-slate-200" />
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
              (s: { name: string; id: string; account_id: string }) => (
                <Source key={s.id} name={s.name} id={s.id} />
              )
            )}
          </div>
        )}
      </div>
      <CreateSource isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Sources;
