import { uid } from "uid";

export function createId(prifix: string) {
  return `${prifix}_${uid(16)}`;
}
