import React, { useEffect, useState } from "react";
import catchError from "../utils/catch";
import api from "../api";

export interface IConnectionContext {
  loading: boolean;
  logout: () => void;
  fetchAccessToken: () => void;
}

export const ConnectionContext = React.createContext<IConnectionContext>(
  {} as IConnectionContext
);

export const useConnection = () => React.useContext(ConnectionContext);

const useProviderConnection = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [onboarding, setOnboarding] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const account = localStorage.getItem("account");
    if (user) {
      setUser(JSON.parse(user));
      if (!account) {
        localStorage.setItem(
          "account",
          JSON.stringify(JSON.parse(user)?.accounts?.[0] || null)
        );
      } else if (account !== "undefined") {
        setAccount(JSON.parse(account));
      } else {
        setAccount(null);
      }
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const response = await api.connections.getConnections();
      if (response) {
        console.log(response);
        return response;
      }
      setLoading(false);
    } catch (e) {
      catchError(e);
      setLoading(false);
    }
  };

  return {
    loading,
    isLoggedIn,
    setIsLoggedIn,
    user,
    onboarding,
    setStep,
    step,
    setOnboarding,
    account,
    setAccount,
    fetchConnections,
  };
};

interface IProps {
  children: React.ReactNode;
}

export const ConnectionProvider = ({ children }: IProps) => {
  const connection: any = useProviderConnection();
  return (
    <ConnectionContext.Provider value={connection}>
      {children}
    </ConnectionContext.Provider>
  );
};
