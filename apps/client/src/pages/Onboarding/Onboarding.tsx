import React from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { createAccount } from "../../api/auth";
import { useNavigate } from "react-router-dom";
// import First from "./First";
// import Second from "./Second";
// import Third from "./Third";
// import Fourth from "./Fourth";
// import Complete from "./Complete";

const Onboarding = () => {
  const navigate = useNavigate();
  const [source, setSource] = React.useState<string>("");
  // const [step, setStep] = React.useState<number>(0);

  const handleCreateAccount = useMutation(
    () => {
      return createAccount({ company_name: source });
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("account", JSON.stringify(data?.data));
        toast.success("Account created successfully");
        navigate("/");
      },
      onError: (error) => {
        console.log(error);
        toast.error("Something went wrong");
      },
    }
  );

  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex justify-end flex-col mx-auto w-[60%]">
        <div
          className="bg-bw-50 mb-0 mx-24 mt-[6rem] rounded-xl"
          style={{
            boxShadow: "0px 0px 13px rgba(37, 62, 255, 0.1)",
            height: "calc(100vh - 6rem)",
          }}
        >
          <div className="mx-20 mt-20 h-full">
            {/* {step === 0 ? (
              <First />
            ) : step === 1 ? (
              <Second />
            ) : step === 2 ? (
              <Third />
            ) : step === 3 ? (
              <Fourth />
            ) : step === 4 ? (
              <Complete />
            ) : null} */}
            <p className="text-4xl font-bold text-primary-300">
              first things first,
            </p>
            <p className="text-4xl mt-2 font-bold text-primary-button">
              Enter your Account Name
            </p>

            <div className="mt-11">
              <p className="text-sm text-primary-500">Name</p>
              <input
                className="w-full bg-bw-100 p-3.5 rounded-md border border-primary-200 mt-2.5"
                name="source"
                value={source || ""}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>
            <div className="flex items-center mt-20">
              {/* <button className="bg-bw-50 text-primary-button border border-primary-button rounded-md px-8 py-3 mr-4">
                Skip
              </button> */}
              <button
                className="bg-primary-button w-full text-bw-50 rounded-md py-3"
                onClick={() => handleCreateAccount.mutate()}
              >
                SetUp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
