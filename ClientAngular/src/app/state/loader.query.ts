import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { LoaderStore, LoaderState } from './loader.store';

@Injectable({ providedIn: 'root' })
export class LoaderQuery extends Query<LoaderState> {
  constructor(protected store: LoaderStore) {
    super(store);
  }

  get getIsLoading() {
    return this.select().pipe(map((x) => x.isLoading));
  }
}
