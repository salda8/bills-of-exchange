import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { PartyStore, PartyState } from './party.store';

@Injectable({ providedIn: 'root' })
export class PartyQuery extends Query<PartyState> {
  constructor(protected store: PartyStore) {
    super(store);
  }
}
