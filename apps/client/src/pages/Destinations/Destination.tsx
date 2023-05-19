import React, { useState } from "react";
import toast from "react-hot-toast";
import Events from "../../assets/Events";
import Edit from "../../assets/Edit";
import Arrow from "../../assets/Arrow";
import { DestinationType } from "../../types";
import CreateDestination from "./CreateDestination";
import { Connections } from "../../components/connections";
import Delete from "../../assets/Delete";
import { useMutation, useQueryClient } from "react-query";
import { deleteDestination } from "../../api/destination";
import { useNavigate } from "react-router-dom";

interface IProps {
  name: string;
  id: string;
  url: string;
  type: DestinationType;
}

const Destination = ({ name, id, type, url }: IProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState<boolean>(false);
  const [editDestination, setEditDestination] = useState(false);

  const handleDeleteDestination = useMutation(
    (id: string) => {
      return deleteDestination(id);
    },
    {
      onSuccess: () => {
        toast.success("Destination deleted successfully");
        queryClient.invalidateQueries("destinations");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      },
    }
  );

  return (
    <div className="h-30 bg-white border rounded-md border-slate-200 mb-3 p-5">
      <div className="flex items-center justify-between">
        <div className="w-[30%]">
          <div className="flex items-center">
            <p className="text-base text-slate-900 font-semibold mr-1">
              {name}
            </p>

            <div
              className="cursor-pointer"
              onClick={() => {
                setEditDestination(true);
              }}
            >
              <Edit />
            </div>
          </div>
          <div
            className="flex items-center mt-3.5"
            onClick={() => setToggle(!toggle)}
          >
            <p className="text-xs text-slate-500 font-semibold mr-1 cursor-pointer">
              SOURCES
            </p>
            <Arrow />
          </div>
        </div>
        <div className="flex items-center w-[10%]" />
        <div className="flex w-[25%]">
          <button
            className="flex rounded bg-gray-200 px-10 py-2.5 items-center"
            onClick={() => {
              navigate(`/events?destination_id=${id}`);
            }}
          >
            <span className="text-slate-900 mr-2.5 text-sm font-semibold">
              View Events
            </span>
            <Events />
          </button>
        </div>
        {/* <div className="flex w-[25%]">
          <button className="flex rounded bg-primary-100 px-10 py-2.5 items-center">
            <span className="text-primary-500 mr-2.5 text-sm font-semibold">
              View Requests
            </span>
            <Requests />
          </button>
        </div> */}
        <div
          className="w-[5%] flex justify-end cursor-pointer"
          onClick={() => {
            handleDeleteDestination.mutate(id);
          }}
        >
          <Delete />
        </div>
      </div>

      {toggle && <Connections type="destination" id={id} name={name} />}

      <CreateDestination
        isOpen={editDestination}
        setIsOpen={setEditDestination}
        update
        updateData={{
          name: name,
          type: type,
          url: url,
        }}
        id={id}
      />
    </div>
  );
};

export default Destination;
