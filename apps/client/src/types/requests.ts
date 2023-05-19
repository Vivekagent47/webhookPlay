import { ISource } from "./source";

export interface IRequest {
  id: string;
  account_id: string;
  body: object;
  created_at: string;
  headers: object;
  source_id: string;
  updated_at: string;
  source: ISource;
}
