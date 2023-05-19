import Axios from "../utils/Axios";

export const getRequests = (page: number) => {
  return Axios({
    method: "GET",
    url: `/api/v1/request?page=${page}`,
  });
};

export const getRequestBySourceId = (sourceId: string, page: number) => {
  return Axios({
    method: "GET",
    url: `/api/v1/request/source/${sourceId}?page=${page}`,
  });
};
