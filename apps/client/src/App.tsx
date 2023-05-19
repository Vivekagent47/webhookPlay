import React, { useContext, useEffect } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { useNavigate } from "react-router-dom";
import Routing from "./Routing";
import "./App.css";
import { useQuery } from "react-query";

import Sidebar from "./components/Sidebar";
import { AuthContext, IAuthContext } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { isLoggedIn, fetchAccessToken } =
    useContext<IAuthContext>(AuthContext);
  const navigate = useNavigate();

  useQuery({
    queryKey: "accessToken",
    queryFn: () => fetchAccessToken(),
    refetchInterval: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!isLoggedIn && !user) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <>
      <ReactQueryDevtools />
      <div className="flex">
        <div className="sticky h-screen top-0 left-0">
          {isLoggedIn ? <Sidebar /> : null}
        </div>
        <div className={`w-full h-full ${isLoggedIn ? "" : ""}`}>
          <Routing />
        </div>
        <Toaster position="bottom-right" />
      </div>
    </>
  );
};

export default App;
