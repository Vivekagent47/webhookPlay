export interface IAttempt {
  id: string;
  account_id: string;
  destination_id: string;
  request_id: string;
  event_id: string;
  status_code: number;
  status_type: "success" | "error" | "pause";
  response: object;
  created_at: string;
  updated_at: string;
}
