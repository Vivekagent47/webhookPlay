import { ICreateConnection } from "../types";
import Axios from "../utils/Axios";

export const getConnections = () => {
  return Axios({
    method: "GET",
    url: "/api/v1/connections",
  });
};

export const getConnectionsBySourceId = (sourceId: string) => {
  return Axios({
    method: "GET",
    url: `/api/v1/connections/source/${sourceId}`,
  });
};

export const getConnectionsByDestinationId = (destinationId: string) => {
  return Axios({
    method: "GET",
    url: `/api/v1/connections/destination/${destinationId}`,
  });
};

export const createConnection = (data: ICreateConnection) => {
  return Axios({
    method: "POST",
    url: "/api/v1/connections",
    data,
  });
};

export const deleteConnection = (id: string) => {
  return Axios({
    method: "DELETE",
    url: `/api/v1/connections/${id}`,
  });
};

export const updateStatusConnection = (id: string) => {
  return Axios({
    method: "PUT",
    url: `/api/v1/connections/${id}/status`,
  });
};
