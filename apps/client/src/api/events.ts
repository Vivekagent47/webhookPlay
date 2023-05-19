import Axios from "../utils/Axios";

export const getEvents = (page: number) => {
  return Axios({
    method: "GET",
    url: `/api/v1/event?page=${page}`,
  });
};

export const getEventById = (eventId: string) => {
  return Axios({
    method: "GET",
    url: `/api/v1/event/${eventId}`,
  });
};

export const getEventByRequestId = (requestId: string) => {
  return Axios({
    method: "GET",
    url: `/api/v1/event/request/${requestId}`,
  });
};

export const getEventByDestinationId = (
  destinationId: string,
  page: number
) => {
  return Axios({
    method: "GET",
    url: `/api/v1/event/destination/${destinationId}?page=${page}`,
  });
};
