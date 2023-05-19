import React from "react";
import toast from "react-hot-toast";
import SwipeUp from "../../components/Swipe";
import { useMutation, useQueryClient } from "react-query";
import { createSource } from "../../api/source";

interface IProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const CreateSource = ({ isOpen, setIsOpen }: IProps) => {
  const queryClient = useQueryClient();
  const [source, setSource] = React.useState<string>("");

  const handleCreateSource = useMutation(
    (data: { name: string }) => {
      return createSource(data);
    },
    {
      onSuccess: () => {
        toast.success("Source created successfully");
        queryClient.refetchQueries("sources");
        setIsOpen(false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      },
    }
  );

  return (
    <SwipeUp isOpen={isOpen} setIsOpen={setIsOpen} heading="Create a Source">
      <div>
        <div className="mt-8 rounded-md bg-slate-200 p-3.5">
          <p className="text-slate-900 font-normal text-base mb-3">
            New Source
          </p>
          <input
            placeholder="Enter name of source"
            className="w-full border border-slate-700 rounded-md px-4 py-2.5 text-slate-900 text-sm"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>

        <div className="flex justify-end mt-20">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-white border text-base border-slate-900 text-slate-900 rounded-md px-6 py-2.5 flex items-center mt-8 mr-4"
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-base text-white rounded-md px-8 py-2.5 flex items-center mt-8"
            onClick={() => {
              handleCreateSource.mutate({ name: source });
            }}
          >
            Save
          </button>
        </div>
      </div>
    </SwipeUp>
  );
};

export default CreateSource;
