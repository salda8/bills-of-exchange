import { Pager } from "./pager";

export interface PagedResult<T> {
  content: T[];
  pager: Pager;
}
