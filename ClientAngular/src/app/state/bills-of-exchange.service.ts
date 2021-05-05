import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BillsOfExchangeStore } from './bills-of-exchange.store';

@Injectable({ providedIn: 'root' })
export class BillsOfExchangeService {
  constructor(private billsOfExchangeStore: BillsOfExchangeStore, private http: HttpClient) {}

  getBills(take: number = 10, skip: number = 0) {
    let params = new HttpParams().set('Take', take.toString()).set('Skip', skip.toString());
    return this.http.get('BillsOfExchange', { params }).pipe(tap((result) => this.billsOfExchangeStore.update(result)));
  }
}
