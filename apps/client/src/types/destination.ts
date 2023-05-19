export enum DestinationType {
  CLI = "cli",
  HTTP = "http",
}

export interface ICreateDestination {
  name: string;
  url: string;
  type: DestinationType;
}

export interface IUpdateDestination {
  name: string;
  url: string;
  type: DestinationType;
}

export interface IDestination {
  id: string;
  name: string;
  url: string;
  account_id: string;
  type: DestinationType;
  created_at: string;
  updated_at: string;
}
