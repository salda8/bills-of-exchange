import { Injectable } from '@angular/core';
import { BillsOfExchange } from '@app/home/models/bills-of-exchange';
import { Pager } from '@app/home/models/pager';
import { Store, StoreConfig } from '@datorama/akita';

export interface BillsOfExchangeState {
  content: BillsOfExchange[];
  pager: Pager;
}

export function createInitialState(): BillsOfExchangeState {
  return {
    content: undefined,
    pager: undefined,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'bills-of-exchange' })
export class BillsOfExchangeStore extends Store<BillsOfExchangeState> {
  constructor() {
    super(createInitialState());
  }
}
