import { Pager } from '@app/home/models/pager';

export interface PagedResult<T> {
  content: T[];
  pager: Pager;
}
