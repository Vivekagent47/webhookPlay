import Axios from "../utils/Axios";
import axios from "axios";

export const fetchAccessToken = async (rt: string) => {
  const config = {
    method: "post",
    url: `https://securetoken.googleapis.com/v1/token?key=${
      import.meta.env.VITE_FIREBASE_API_KEY
    }`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      grant_type: "refresh_token",
      refresh_token: rt,
    },
  };

  const res = await axios(config);

  if (res?.data) return res.data;

  return false;
};

export const signUp = async () => {
  return Axios({
    method: "POST",
    url: "/api/v1/auth/signup",
  });
};

export const signIn = async () => {
  return Axios({
    method: "POST",
    url: "/api/v1/auth/login",
  });
};

export const createAccount = async (body: { company_name: string }) => {
  const data = JSON.stringify(body);
  return Axios({
    method: "POST",
    url: "/api/v1/account",
    data,
  });
};

export const assignAccount = async (data: { user_email: string }) => {
  return Axios({
    method: "POST",
    url: "/api/v1/account/assign",
    data,
  });
};
