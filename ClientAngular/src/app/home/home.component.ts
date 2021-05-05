import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BillsOfExchange } from '@app/home/models/bills-of-exchange';
import { Party } from '@app/home/models/party';
import { BillsOfExchangeQuery } from '@app/state/bills-of-exchange.query';
import { BillsOfExchangeService } from '@app/state/bills-of-exchange.service';
import { BillsOfExchangeState } from '@app/state/bills-of-exchange.store';
import { PartyQuery } from '@app/state/party.query';
import { PartyService } from '@app/state/party.service';
import { PartyState } from '@app/state/party.store';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { ApiClientService } from './api-client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  pageSize = 5;

  partyResultsLength = 0;
  partyDisplayedColumns = ['id', 'name'];
  partyPageIndex = 0;
  parties: Party[];

  billOfExchangeDisplayedColumns = ['id', 'drawerId', 'beneficiaryId', 'amount'];
  billOfExchangeResultsLength = 0;
  billOfExchangePageIndex = 0;
  billsOfExchange: BillsOfExchange[];

  constructor(
    private quoteService: ApiClientService,
    private router: Router,
    private partyService: PartyService,
    private partyQuery: PartyQuery,
    private billsOfExchangeQuery: BillsOfExchangeQuery,
    private billsOfExchangeService: BillsOfExchangeService
  ) {}

  ngOnInit() {
    this.loadBills();
    this.loadParties();
    this.subscription.add(
      this.partyQuery
        .select()
        .pipe(filter(Boolean))
        .subscribe((result: PartyState) => {
          if (result.content) {
            this.partyResultsLength = result.pager.totalItems;
            this.parties = result.content;
          }
        })
    );

    this.subscription.add(
      this.billsOfExchangeQuery
        .select()
        .pipe(filter(Boolean))
        .subscribe((result: BillsOfExchangeState) => {
          if (result.content) {
            this.billsOfExchange = result.content;
            this.billOfExchangeResultsLength = result.pager.totalItems;
          }
        })
    );
  }

  private loadBills() {
    this.billsOfExchangeService
      .getBills(this.pageSize, this.billOfExchangePageIndex * this.pageSize)
      .pipe(take(1))
      .subscribe();
  }

  onPartyPageChange(pageEvent: PageEvent) {
    this.partyPageIndex = pageEvent.pageIndex;
    this.loadParties();
  }

  private loadParties() {
    this.partyService
      .getParties(this.pageSize, this.partyPageIndex * this.pageSize)
      .pipe(take(1))
      .subscribe();
  }

  onBillOfExchangePageChange(pageEvent: PageEvent) {
    this.billOfExchangePageIndex = pageEvent.pageIndex;
    this.loadBills();
  }

  openPartyDetail({ id }: Party) {
    this.router.navigate(['party'], { queryParams: { id } });
  }

  openBillOfExchangeDetail({ id }: BillsOfExchange) {
    this.router.navigate(['bill-of-exchange'], { queryParams: { id } });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
