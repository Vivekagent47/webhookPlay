import * as auth from "./auth";
import * as source from "./source";
import * as destination from "./destination";
import * as connections from "./connections";
import * as events from "./events";
import * as requests from "./requests";
import * as attempts from "./attempt";

const api = {
  auth,
  source,
  destination,
  connections,
  events,
  requests,
  attempts,
};

export default api;
