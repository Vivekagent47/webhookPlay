import { ICreateSource, IUpdateSource } from "../types";
import Axios from "../utils/Axios";

export const fetchSources = async () => {
  return Axios({
    method: "GET",
    url: "/api/v1/source",
  });
};

export const createSource = async (data: ICreateSource) => {
  return Axios({
    method: "POST",
    url: "/api/v1/source",
    data,
  });
};

export const updateSource = async (id: string, data: IUpdateSource) => {
  return Axios({
    method: "PUT",
    url: `/api/v1/source/${id}`,
    data,
  });
};

export const deleteSource = async (id: string) => {
  return Axios({
    method: "DELETE",
    url: `/api/v1/source/${id}`,
  });
};
