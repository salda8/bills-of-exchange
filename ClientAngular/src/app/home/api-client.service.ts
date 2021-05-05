import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BillOfExchangeWithCurrentOwner } from '@app/home/models/bill-of-exchange-with-current.owner';
import { BillsOfExchange } from '@app/home/models/bills-of-exchange';
import { Endorsement } from '@app/home/models/endorsement';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  constructor(private httpClient: HttpClient) {}

  getOwnedBillsOfExchange(ownerId: number): Observable<BillsOfExchange[]> {
    let params = new HttpParams().set('ownerId', ownerId.toString());
    return this.httpClient.get('BillsOfExchange/owned-by', { params }).pipe(map((body: any) => body));
  }

  getBillsOfExchangeIssueBy(issuerId: number): Observable<BillsOfExchange[]> {
    let params = new HttpParams().set('drawerId', issuerId.toString());
    return this.httpClient.get('BillsOfExchange/issued-by', { params }).pipe(map((body: any) => body));
  }

  getEndorsementsForBill(billId: number): Observable<Endorsement[]> {
    let params = new HttpParams().set('billId', billId.toString());
    return this.httpClient.get('Endorsements', { params }).pipe(map((body: any) => body));
  }

  getBillOfExchangeWithCurrentOwner(billId: number): Observable<BillOfExchangeWithCurrentOwner> {
    return this.httpClient.get(`BillsOfExchange/${billId}`).pipe(map((body: any) => body));
  }
}
