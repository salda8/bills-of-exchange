import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface NavigationState {
  url: string;
}

export function createInitialState(): NavigationState {
  return {
    url: '',
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'navigation' })
export class NavigationStore extends Store<NavigationState> {
  constructor() {
    super(createInitialState());
  }
}
