import { IDestination } from "./destination";
import { IRequest } from "./requests";

export interface IEvent {
  id: string;
  account_id: string;
  destination_id: string;
  request_id: string;
  status_code: number;
  status_type: "success" | "error" | "pause";
  created_at: string;
  updated_at: string;
  destination: IDestination;
  request: IRequest;
}
