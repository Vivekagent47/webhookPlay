import React from "react";
import toast from "react-hot-toast";
import SwipeUp from "../../components/Swipe";
import { useMutation, useQueryClient } from "react-query";
import { ICreateDestination, DestinationType } from "../../types";
import { createDestination, updateDestination } from "../../api/destination";
import { isValidUrl } from "../../utils/helper";

interface IProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  update?: boolean;
  updateData?: ICreateDestination;
  id?: string;
}

const CreateDestination = ({
  isOpen,
  setIsOpen,
  update,
  id,
  updateData,
}: IProps) => {
  const queryClient = useQueryClient();
  const [destination, setDestination] = React.useState<ICreateDestination>({
    name: update ? (updateData?.name ? updateData.name : "") : "",
    url: update ? (updateData?.url ? updateData.url : "") : "",
    type: update
      ? updateData?.type
        ? updateData.type
        : DestinationType.HTTP
      : DestinationType.HTTP,
  });

  const handleCreateDestination = useMutation(
    (data: ICreateDestination) => {
      if (
        destination.type === DestinationType.CLI &&
        !destination.url.startsWith("/")
      ) {
        throw new Error("Enter valid endpoint. Endpoint should start with /");
      } else if (
        destination.type === DestinationType.HTTP &&
        !isValidUrl(destination.url)
      ) {
        throw new Error("Enter valid URL.");
      }

      if (update) {
        return updateDestination(id || "", data);
      }
      return createDestination(data);
    },
    {
      onSuccess: () => {
        toast.success("Destination created successfully");
        queryClient.refetchQueries("destinations");
        setIsOpen(false);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong"
        );
      },
    }
  );

  return (
    <SwipeUp
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      heading={`${!update ? "Create" : "Update"} a Destination`}
    >
      <div>
        <div className="mt-8 rounded-md bg-slate-200 p-3.5">
          <p className="text-slate-900 font-normal text-base mb-3">
            New Destination Name
          </p>
          <input
            placeholder="Enter Destination Name"
            className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-slate-900 text-sm"
            value={destination.name}
            onChange={(e) =>
              setDestination((prv) => ({ ...prv, name: e.target.value }))
            }
          />
        </div>

        <div className="mt-8 rounded-md bg-slate-200 p-3.5">
          <p className="text-slate-900 font-normal text-base mb-3">
            Destination Type
          </p>

          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 my-2">
            <li
              className="mr-2 cursor-pointer"
              onClick={() =>
                setDestination((prv) => ({
                  ...prv,
                  type: DestinationType.HTTP,
                  url: "",
                }))
              }
            >
              <span
                className={`inline-block px-4 py-1 rounded-lg active ${
                  destination.type === DestinationType.HTTP
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
              >
                HTTP
              </span>
            </li>
            <li
              className="mr-2 cursor-pointer"
              onClick={() =>
                setDestination((prv) => ({
                  ...prv,
                  type: DestinationType.CLI,
                  url: "",
                }))
              }
            >
              <span
                className={`inline-block px-4 py-1 rounded-lg active ${
                  destination.type === DestinationType.CLI
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
              >
                CLI
              </span>
            </li>
          </ul>
          <div className="mt-4 rounded-md bg-bw-100">
            <p className="text-slate-900 font-normal text-sm mb-3">
              {destination.type === DestinationType.HTTP ? "URL" : "Endpoint"}
            </p>
            <input
              placeholder={
                destination.type === DestinationType.HTTP
                  ? "https://example.com"
                  : "/api/v1"
              }
              className="w-full border border-slate-100 rounded-md px-4 py-2.5 text-slate-900 text-sm"
              value={destination.url}
              onChange={(e) =>
                setDestination((prv) => ({ ...prv, url: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="flex justify-end mt-20">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-bw-50 border text-base border-slate-900 text-slate-900 rounded-md px-6 py-2.5 flex items-center mt-8 mr-4"
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-base text-white rounded-md px-8 py-2.5 flex items-center mt-8"
            onClick={() => {
              handleCreateDestination.mutate(destination);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </SwipeUp>
  );
};

export default CreateDestination;
