import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '@app/home/api-client.service';
import { take } from 'rxjs/operators';
import { BillsOfExchange } from '../models/bills-of-exchange';

@Component({
  selector: 'app-party-detail-dialog',
  templateUrl: './party-detail-dialog.component.html',
  styleUrls: ['./party-detail-dialog.component.scss'],
})
export class PartyDetailDialogComponent implements OnInit {
  id: number;

  constructor(
    private apiClientService: ApiClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ownedBills: BillsOfExchange[] = [];
  displayedColumns = ['id', 'drawerId', 'beneficiaryId', 'amount'];
  issuedBills: BillsOfExchange[] = [];

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((params) => {
      if (params.id) {
        this.id = params.id;

        this.apiClientService
          .getOwnedBillsOfExchange(this.id)
          .pipe(take(1))
          .subscribe((result) => {
            if (result) {
              this.ownedBills = result;
            }
          });

        this.apiClientService
          .getBillsOfExchangeIssueBy(this.id)
          .pipe(take(1))
          .subscribe((result) => {
            if (result) {
              this.issuedBills = result;
            }
          });
      }
    });
  }

  openBillOfExchangeDetail(id: string) {
    this.router.navigate(['bill-of-exchange'], { queryParams: { id } });
  }
}
