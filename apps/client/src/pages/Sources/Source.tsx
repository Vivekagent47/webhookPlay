import React, { useState } from "react";
import Events from "../../assets/Events";
import Requests from "../../assets/Requests";
import Copy from "../../assets/Copy";
import Edit from "../../assets/Edit";
import Arrow from "../../assets/Arrow";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { updateSource, deleteSource } from "../../api/source";
import { Connections } from "../../components/connections";
import Delete from "../../assets/Delete";
import { useNavigate } from "react-router-dom";

interface IProps {
  name: string;
  id: string;
}

const Source = ({ name, id }: IProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState<boolean>(false);
  const [source, setSource] = useState({
    name: name,
    id: id,
  });
  const [editSource, setEditSource] = useState(false);

  const handleSourceName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSource((prv) => ({ ...prv, name: e.target.value }));
  };

  const handleUpdateSourceName = useMutation(
    () => {
      return updateSource(source.id, { name: source.name });
    },
    {
      onSuccess: () => {
        toast.success("Source updated successfully");
        setEditSource(false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      },
    }
  );

  const handleDeleteSource = useMutation(
    (id: string) => {
      return deleteSource(id);
    },
    {
      onSuccess: () => {
        toast.success("Source deleted successfully");
        queryClient.invalidateQueries("sources");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      },
    }
  );

  return (
    <div className="h-30 bg-bw-50 border rounded-md border-bw-200 mb-3 p-5">
      <div className="flex items-center justify-between">
        <div className="w-[30%]">
          <div className="flex items-center">
            {editSource ? (
              <input
                type="text"
                value={source.name}
                onChange={handleSourceName}
                className="text-base text-slate-900 font-normal border-b-2 border-slate-500 focus:outline-none"
              />
            ) : (
              <p className="text-base text-slate-900 font-semibold mr-1">
                {source.name}
              </p>
            )}
            <div
              className="cursor-pointer"
              onClick={() => {
                if (editSource) {
                  handleUpdateSourceName.mutate();
                } else {
                  setEditSource(true);
                }
              }}
            >
              <Edit />
            </div>
          </div>
          <div className="flex items-center mt-3.5">
            <p className="text-xs text-slate-700 font-semibold mr-1">
              Copy webhook URL
            </p>
            <div
              className=" cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://v1.dstream.dev/s/${source.id}`
                );
              }}
            >
              <Copy />
            </div>
          </div>
          <div
            className="flex items-center mt-3.5"
            onClick={() => setToggle(!toggle)}
          >
            <p className="text-xs text-slate-500 font-semibold mr-1 cursor-pointer">
              DESTINATIONS
            </p>
            <Arrow />
          </div>
        </div>
        <div className="flex items-center w-[10%]" />
        {/* <div className="flex w-[25%]">
          <button className="flex rounded bg-primary-100 px-10 py-2.5 items-center">
            <span className="text-primary-500 mr-2.5 text-sm font-semibold">
              View Events
            </span>
            <Events />
          </button>
        </div> */}
        <div
          className="flex w-[25%]"
          onClick={() => {
            navigate(`/requests?source_id=${source.id}`);
          }}
        >
          <button className="flex rounded bg-gray-200 px-10 py-2.5 items-center">
            <span className="text-slate-900 mr-2.5 text-sm font-semibold">
              View Requests
            </span>
            <Requests />
          </button>
        </div>
        <div
          className="w-auto flex justify-end cursor-pointer"
          onClick={() => {
            handleDeleteSource.mutate(source.id);
          }}
        >
          <Delete />
        </div>
      </div>

      {toggle && (
        <Connections type="source" id={source.id} name={source.name} />
      )}
    </div>
  );
};

export default Source;
