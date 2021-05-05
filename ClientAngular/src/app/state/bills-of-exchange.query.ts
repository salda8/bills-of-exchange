import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { BillsOfExchangeStore, BillsOfExchangeState } from './bills-of-exchange.store';

@Injectable({ providedIn: 'root' })
export class BillsOfExchangeQuery extends Query<BillsOfExchangeState> {
  constructor(protected store: BillsOfExchangeStore) {
    super(store);
  }
}
