import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { NavigationStore, NavigationState } from './navigation.store';

@Injectable({ providedIn: 'root' })
export class NavigationQuery extends Query<NavigationState> {
  constructor(protected store: NavigationStore) {
    super(store);
  }

  get getLastUrl() {
    return this.getValue().url;
  }
}
