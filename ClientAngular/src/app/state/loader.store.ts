import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface LoaderState {
  isLoading: boolean;
}

export function createInitialState(): LoaderState {
  return {
    isLoading: false,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'loader' })
export class LoaderStore extends Store<LoaderState> {
  constructor() {
    super(createInitialState());
  }

  updateIsLoading(isLoading: boolean) {
    this.update({ isLoading });
  }
}
