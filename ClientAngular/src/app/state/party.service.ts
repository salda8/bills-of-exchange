import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { PartyStore } from './party.store';

@Injectable({ providedIn: 'root' })
export class PartyService {
  constructor(private partyStore: PartyStore, private http: HttpClient) {}

  getParties(take: number = 10, skip: number = 0) {
    let params = new HttpParams().set('Take', take.toString()).set('Skip', skip.toString());
    return this.http.get('Party', { params }).pipe(tap((result) => this.partyStore.update(result)));
  }
}
