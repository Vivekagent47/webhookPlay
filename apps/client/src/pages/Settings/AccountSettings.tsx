import React from "react";
import Copy from "../../assets/Copy";

const AccountSettings = () => {
  const [input, setInput] = React.useState<boolean>(false);
  const [tab, setTab] = React.useState<number>(1);

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <p className="text-2xl text-bw-900 font-semibold">Account Settings</p>
      </div>
      <div className="w-full border-b border-bw-200" />
      <div className="flex items-center justify-between border-b border-bw-200 -pb-2 mt-10 w-1/2">
        <div
          className={`w-1/2 text-center ${
            tab === 1 ? "border-primary-button border-b-2" : ""
          } pb-2 cursor-pointer`}
          onClick={() => setTab(1)}
        >
          <p
            className={`${
              tab === 1 ? "text-primary-button" : "text-primary-400"
            } font-normal text-base`}
          >
            Profile
          </p>
        </div>
        <div
          className={`w-1/2 text-center ${
            tab === 2 ? "border-primary-button border-b-2" : ""
          } pb-2 cursor-pointer`}
          onClick={() => setTab(2)}
        >
          <p
            className={`${
              tab === 2 ? "text-primary-button" : "text-primary-400"
            } font-normal text-base`}
          >
            Keys
          </p>
        </div>
        <div
          className={`w-1/2 text-center ${
            tab === 3 ? "border-primary-button border-b-2" : ""
          } pb-2 cursor-pointer`}
          onClick={() => setTab(3)}
        >
          <p
            className={`${
              tab === 3 ? "text-primary-button" : "text-primary-400"
            } font-normal text-base`}
          >
            Users
          </p>
        </div>
        <div
          className={`w-1/2 text-center ${
            tab === 4 ? "border-primary-button border-b-2" : ""
          } pb-2 cursor-pointer`}
          onClick={() => setTab(4)}
        >
          <p
            className={`${
              tab === 4 ? "text-primary-button" : "text-primary-400"
            } font-normal text-base`}
          >
            Billing
          </p>
        </div>
      </div>
      <div className="bg-bw-50 rounded-md p-6 mt-10">
        {tab === 1 ? (
          <>
            <div className="p-3 border border-bw-200 rounded-md w-1/2">
              <p className="text-bw-1000 font-normal text-sm mb-4">
                ACCOUNT NAME
              </p>
              <input className="w-full border border-bw-200 bg-bw-100 rounded-md px-4 py-2.5 text-bw-900 text-sm" />
            </div>
            <div className="p-3 border border-bw-200 rounded-md w-1/2 mt-6">
              <p className="text-bw-1000 font-normal text-sm mb-4">
                CURRENT PLAN
              </p>
              <div className="border border-bw-200 flex items-center justify-between px-3 py-10 rounded-md">
                <p className="text-bw-700 font-normal text-base">
                  Developer Plan
                </p>
                <p className="text-primary-button font-normal text-base">
                  Get Premium
                </p>
              </div>
            </div>
          </>
        ) : tab === 2 ? (
          <>
            <div className="p-3 border border-bw-200 rounded-md w-1/2">
              <p className="text-bw-1000 font-normal text-sm mb-4">API KEY</p>
              <div className="flex justify-between items-center bg-bw-100 p-3.5 rounded-md border border-primary-200 mt-2.5">
                <p className="text-bw-700">https/askjdhjaskjdnka.sjdn/ajj</p>
                <Copy />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AccountSettings;
