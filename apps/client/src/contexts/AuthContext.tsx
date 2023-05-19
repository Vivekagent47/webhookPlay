import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import catchError from "../utils/catch";
import api from "../api";

interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  accounts: any[];
  created_at?: string;
  updated_at?: string;
}

export interface IAuthContext {
  loading: boolean;
  user: IUser;
  account: any;
  setAccount: (account: any) => void;
  isLoggedIn: boolean;
  onboarding: boolean;
  setOnboarding: (onboarding: boolean) => void;
  step: number;
  setStep: (step: number) => void;
  signIn: (userData: any) => void;
  signUp: (userData: any) => void;
  logout: () => void;
  fetchAccessToken: () => void;
}

export const AuthContext = React.createContext<IAuthContext>(
  {} as IAuthContext
);

export const useAuth = () => React.useContext(AuthContext);

const useProviderAuth = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [onboarding, setOnboarding] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const navigate = useNavigate();

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

  const signIn = async (userData: any) => {
    try {
      setLoading(true);
      if (userData) {
        localStorage.setItem(
          "access_token",
          userData?.stsTokenManager?.accessToken
        );
        localStorage.setItem(
          "refresh_token",
          userData?.stsTokenManager?.refreshToken
        );
        localStorage.setItem(
          "expiry",
          userData?.stsTokenManager?.expirationTime
        );
        const profile = await api.auth.signIn();
        if (profile?.data) {
          localStorage.setItem("user", JSON.stringify(profile?.data));
          setUser(profile?.data);
          setAccount(profile?.data?.accounts?.[0]);
          if (!profile?.data?.accounts?.[0]) {
            navigate("/onboarding");
          }
          localStorage.setItem(
            "account",
            JSON.stringify(profile?.data?.accounts?.[0])
          );
          setIsLoggedIn(true);
          navigate("/");
        }
      }
      setLoading(false);
    } catch (e: any) {
      localStorage.clear();
      if (e?.response?.status === 404) {
        setLoading(false);
        toast.error("User not found! Sign up to continue.");
      } else {
        catchError(e);
        setLoading(false);
      }
    }
  };

  const signUp = async (userData: any) => {
    try {
      setLoading(true);
      if (userData) {
        localStorage.setItem(
          "access_token",
          userData?.stsTokenManager?.accessToken
        );
        localStorage.setItem(
          "refresh_token",
          userData?.stsTokenManager?.refreshToken
        );
        localStorage.setItem(
          "expiry",
          userData?.stsTokenManager?.expirationTime
        );
        const profile = await api.auth.signUp();
        if (profile?.data) {
          setUser(profile.data);
          localStorage.setItem("user", JSON.stringify(profile.data));
          navigate("/onboarding");
        }
      }
      setLoading(false);
    } catch (e: any) {
      localStorage.clear();
      if (e?.response?.data?.message === "User already exists") {
        await signIn(userData);
      } else {
        catchError(e);
        toast.error("Login Failed! Try again.");
        setLoading(false);
      }
    }
  };

  const fetchAccessToken = async () => {
    try {
      setLoading(true);
      const rt = localStorage.getItem("refresh_token") || "";
      if (!rt) return;
      const response = await api.auth.fetchAccessToken(rt);
      if (response) {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);
      }
      setLoading(false);
    } catch (e) {
      catchError(e);
      setLoading(false);
    }
  };

  // const fetchUserData = async () => {
  //   try {
  //     setLoading(true);
  //     const email = JSON.parse(localStorage?.getItem("user"))?.email;
  //     const userData = await api.auth.fetchUserData(email);
  //     if (userData) {
  //       setUser(userData);
  //       const savedAccount = localStorage.getItem("account");
  //       localStorage.setItem("user", JSON.stringify(userData));
  //       if (!savedAccount) {
  //         setAccount(userData?.accounts?.[0]);
  //         localStorage.setItem(
  //           "account",
  //           JSON.stringify(userData?.accounts?.[0])
  //         );
  //       }
  //       setIsLoggedIn(true);
  //     }
  //     setLoading(false);
  //   } catch (e) {
  //     catchError(e);
  //     setLoading(false);
  //   }
  // };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setAccount(null);
    setIsLoggedIn(false);
    navigate("/login");
    window.location.reload();
  };

  return {
    loading,
    isLoggedIn,
    setIsLoggedIn,
    user,
    onboarding,
    signUp,
    signIn,
    logout,
    setStep,
    step,
    setOnboarding,
    account,
    setAccount,
    fetchAccessToken,
  };
};

interface IProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IProps) => {
  const auth: any = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
