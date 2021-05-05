import { Injectable } from '@angular/core';
import { Pager } from '@app/home/models/pager';
import { Party } from '@app/home/models/party';
import { Store, StoreConfig } from '@datorama/akita';

export interface PartyState {
  content: Party[];
  pager: Pager;
}

export function createInitialState(): PartyState {
  return {
    pager: undefined,
    content: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'party' })
export class PartyStore extends Store<PartyState> {
  constructor() {
    super(createInitialState());
  }
}
