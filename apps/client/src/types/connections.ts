import { IDestination } from "./destination";
import { ISource } from "./source";

export interface ICreateConnection {
  source_id: string;
  destination_id: string;
}

export interface IUpdateConnection {
  source_id: string;
  destination_id: string;
}

export interface IConnection {
  id: string;
  source_id: string;
  destination_id: string;
  account_id: string;
  is_active: boolean;
  source: ISource;
  destination: IDestination;
  created_at: string;
  updated_at: string;
}
