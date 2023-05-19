import React from "react";
import FullLogo from "../assets/FullLogo";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const uperList = [
    {
      name: "Sources",
      path: "/",
    },
    {
      name: "Destinations",
      path: "/destinations",
    },
  ];

  const lowerList = [
    {
      name: "Requests",
      path: "/request/all",
    },
    {
      name: "Events",
      path: "/event/all",
    },
    // {
    //   name: "Bookmarks",
    //   path: "/bookmarks",
    // },
  ];

  const { pathname } = useLocation();

  return (
    <div className="flex bg-slate-50">
      <div className="flex flex-col h-screen bg-white shadow w-52">
        <div className="px-6 mt-8">
          <div className="flex items-center">
            <FullLogo width="150px" height="100%" />
          </div>
          <div className="flex items-center mt-11">
            <p className="text-sm font-semibold text-slate-900 mr-2">
              CLI CONNECT
            </p>
            <div className="h-1 w-6 bg-blue-600 rounded-full" />
          </div>
          <div className="flex-1">
            <ul className="my-6">
              {uperList?.map((s: { name: string; path: string }) => (
                <li className="mb-4" key={s.name}>
                  <Link
                    to={s.path}
                    className={`flex items-center px-3 rounded py-2 ${
                      pathname === s.path ? "bg-slate-100" : ""
                    }`}
                  >
                    {/* <div className="w-7 h-7 bg-bw-900 mr-2" /> */}
                    <p className="text-sm font-semibold text-slate-900">
                      {s.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="h-px w-full bg-slate-300" />
            <ul className="mt-6">
              {lowerList?.map((s: { name: string; path: string }) => (
                <li className="mb-4" key={s.name}>
                  <Link
                    to={s.path}
                    className={`flex items-center px-3 py-2 rounded ${
                      pathname === s.path ? "bg-slate-100" : ""
                    }`}
                  >
                    {/* <div className="w-7 h-7 bg-bw-900 mr-2" /> */}
                    <p className="text-sm font-semibold text-slate-900">
                      {s.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
