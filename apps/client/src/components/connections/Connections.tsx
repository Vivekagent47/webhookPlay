import React, { useEffect, useState } from "react";
import Add from "../../assets/Add";
import Events from "../../assets/Events";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteConnection,
  createConnection,
  getConnectionsByDestinationId,
  getConnectionsBySourceId,
  updateStatusConnection,
} from "../../api/connections";
import Spinner from "../Spinner";
import toast from "react-hot-toast";
import SwipeUp from "../../components/Swipe";
import { Select } from "../../components/Select";
import Pause from "../../assets/Pause";
import Copy from "../../assets/Copy";
import {
  IConnection,
  ISource,
  IDestination,
  ICreateConnection,
} from "../../types";
import { fetchDestinations } from "../../api/destination";
import { fetchSources } from "../../api/source";
import Delete from "../../assets/Delete";
import { useNavigate } from "react-router-dom";
import Play from "../../assets/Play";

interface IProps {
  type: "source" | "destination";
  id: string;
  name: string;
}

const Connections = ({ type, id, name }: IProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [height, setheight] = useState(3 + (1 - 1) * 7);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useQuery(
    ["connections", type, id],
    () => {
      if (type === "source") {
        return getConnectionsBySourceId(id);
      } else if (type === "destination") {
        return getConnectionsByDestinationId(id);
      } else {
        toast.error("Pass correct params");
      }
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      select: (data) => (data?.data ? data.data : []) as IConnection[],
    }
  );

  useEffect(() => {
    setheight(3 + ((data || []).length - 1) * 7);
  }, [data]);

  if (type === "source") {
    useQuery(
      "destinations",
      () => {
        return fetchDestinations();
      },
      {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,
        refetchInterval: false,
        select: (data) => (data?.data ? data.data : []) as IDestination[],
      }
    );
  } else if (type === "destination") {
    useQuery(
      "sources",
      () => {
        return fetchSources();
      },
      {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,
        refetchInterval: false,
        select: (data) => (data?.data ? data.data : []) as ISource[],
      }
    );
  }

  const handleDeleteConnections = useMutation(
    (id: string) => {
      return deleteConnection(id);
    },
    {
      onSuccess: () => {
        toast.success("Connection deleted successfully");
        queryClient.invalidateQueries(["connections", type, id]);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message || "Something went wrong");
      },
    }
  );

  const handleUpdateStatus = useMutation(
    (id: string) => {
      return updateStatusConnection(id);
    },
    {
      onSuccess: () => {
        toast.success("Connection updated successfully");
        queryClient.invalidateQueries(["connections", type, id]);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message || "Something went wrong");
      },
    }
  );

  return (
    <>
      {isLoading ? (
        <div className="w-full flex items-center justify-center p-8">
          <Spinner />
        </div>
      ) : (
        <>
          <div
            className={`absolute mt-4 w-1 bg-blue-500 rounded-3xl`}
            style={{ height: `${height}rem` }}
          />
          {data?.map((c: IConnection) => (
            <div
              key={c.id}
              className="flex items-center mt-4 mx-[5%] rounded-md p-5 bg-slate-50"
            >
              <div className="h-1 w-12 bg-blue-500 -ml-[7.5%] rounded-3xl" />
              <div className="w-[27%] ml-[3%]">
                <p className="text-base text-slate-900 font-normal">
                  {type === "source" ? c.destination.name : c.source.name}
                </p>
                {type === "destination" ? (
                  <div className="flex items-center mt-3.5">
                    <p className="text-xs text-slate-600 font-semibold mr-1">
                      Copy webhook URL
                    </p>
                    <div
                      className=" cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://v1.dstream.dev/s/${c.source_id}`
                        );
                      }}
                    >
                      <Copy />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center mt-3.5">
                    <p className="text-xs text-slate-500 uppercase font-semibold mr-1">
                      {c?.destination?.type || ""}
                    </p>
                  </div>
                )}
              </div>
              <div
                className="flex items-center w-[17%] cursor-pointer"
                onClick={() => {
                  handleUpdateStatus.mutate(c.id);
                }}
              >
                {c.is_active ? <Pause /> : <Play />}
                <p className="text-slate-500 ml-2 font-semibold text-sm">
                  {c.is_active ? "Pause" : "Play"}
                </p>
              </div>
              <div className="flex w-[51%]">
                <button
                  className="flex rounded bg-gray-200 px-10 py-2.5 items-center"
                  onClick={() => {
                    if (type === "source") {
                      navigate(`/events?destination_id=${c.destination_id}`);
                    } else if (type === "destination") {
                      navigate(`/requests?source_id=${c.source_id}`);
                    }
                  }}
                >
                  <span className="text-slate-900 mr-2.5 text-sm font-semibold">
                    {type === "destination" ? "View Requests" : "View Events"}
                  </span>
                  <Events />
                </button>
              </div>
              <div
                className="w-auto cursor-pointer flex justify-end"
                onClick={() => {
                  handleDeleteConnections.mutate(c.id);
                }}
              >
                <Delete />
              </div>
            </div>
          ))}
          <div className="mt-8 mx-[5%] flex justify-end">
            <button
              onClick={() => setIsOpen(true)}
              className="text-blue-600 border border-blue-600 bg-bw-50 rounded-md px-4 py-2 flex items-center"
            >
              <span className="mr-2 text-sm">
                Add {type === "destination" ? "Source" : "Destination"}
              </span>
              <Add color="#253EFF" />
            </button>
          </div>
          <CreateConnection
            source={{
              id: type === "source" ? id : "",
              name: type === "source" ? name : "",
            }}
            destination={{
              id: type === "destination" ? id : "",
              name: type === "destination" ? name : "",
            }}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </>
      )}
    </>
  );
};

interface ICreatConnectionProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  source: { id: string; name: string };
  destination: { id: string; name: string };
}

const CreateConnection = ({
  isOpen,
  setIsOpen,
  source,
  destination,
}: ICreatConnectionProps) => {
  const queryClient = useQueryClient();

  const sources: any = queryClient.getQueryData("sources");
  const destinations: any = queryClient.getQueryData("destinations");

  const [cSource, setCSource] = useState(source);
  const [cDestination, setCDestination] = useState(destination);

  const handleCreateConnection = useMutation(
    ({ source_id, destination_id }: ICreateConnection) => {
      if (!source_id || !destination_id) {
        toast.error("Please select source and destination");
        throw new Error("Please select source and destination");
      }

      return createConnection({ source_id, destination_id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("connections");
        toast.success("Connection created successfully");
        setIsOpen(false);
      },
      onError: (error: any) => {
        toast.error(
          error.response.data.message || error.message || "Something went wrong"
        );
      },
    }
  );

  return (
    <SwipeUp
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      heading="Create a Connection"
    >
      <div>
        <div>
          <p className="text-slate-900 font-normal text-base mb-4">
            Source Name
          </p>
          <div className="flex items-center">
            <Select
              placeholder="Select Source"
              value={cSource}
              onChange={(val: any) =>
                setCSource({ id: val.id, name: val.name })
              }
              options={sources?.data ? sources.data : []}
              primaryColor="blue"
              isSearchable={true}
              classNames={{ menu: " z-50 absolute bg-[#fff] w-full" }}
            />
          </div>
        </div>

        <div className="mt-8">
          <p className="text-slate-900 font-normal text-base mb-4">
            Destination Name
          </p>
          <div className="flex items-center">
            <Select
              placeholder="Select Destination"
              value={cDestination}
              onChange={(val: any) =>
                setCDestination({ id: val.id, name: val.name })
              }
              options={destinations?.data ? destinations.data : []}
              primaryColor="blue"
              isSearchable={true}
              classNames={{ menu: " z-50 absolute bg-[#fff] w-full" }}
            />
          </div>
        </div>

        <div className="flex justify-end mt-10">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-bw-50 border text-base border-slate-900 text-slate-900 rounded-md px-6 py-2.5 flex items-center mt-8 mr-4"
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-base text-white rounded-md px-8 py-2.5 flex items-center mt-8"
            onClick={() => {
              handleCreateConnection.mutate({
                source_id: cSource.id,
                destination_id: cDestination.id,
              });
            }}
          >
            Save
          </button>
        </div>
      </div>
    </SwipeUp>
  );
};

export default Connections;
