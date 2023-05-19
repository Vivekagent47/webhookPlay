import Axios from "../utils/Axios";

export const getAttemptsByEventId = (eventId: string) => {
  return Axios({
    method: "GET",
    url: `/api/v1/attempt/event/${eventId}`,
  });
};

export const retryAttempt = (event_id: string, request_id: string) => {
  return Axios({
    method: "POST",
    url: `/api/v1/attempt`,
    data: {
      event_id,
      request_id,
    },
  });
};
