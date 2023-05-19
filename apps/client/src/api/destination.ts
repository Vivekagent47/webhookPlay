import { ICreateDestination, IUpdateDestination } from "../types";
import Axios from "../utils/Axios";

export const fetchDestinations = async () => {
  return Axios({
    method: "GET",
    url: "/api/v1/destination",
  });
};

export const createDestination = async (data: ICreateDestination) => {
  return Axios({
    method: "POST",
    url: "/api/v1/destination",
    data,
  });
};

export const updateDestination = async (
  id: string,
  data: IUpdateDestination
) => {
  return Axios({
    method: "PUT",
    url: `/api/v1/destination/${id}`,
    data,
  });
};

export const deleteDestination = async (id: string) => {
  return Axios({
    method: "DELETE",
    url: `/api/v1/destination/${id}`,
  });
};
