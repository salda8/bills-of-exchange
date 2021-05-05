import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '@app/home/api-client.service';
import { BillOfExchangeWithCurrentOwner } from '@app/home/models/bill-of-exchange-with-current.owner';
import { take } from 'rxjs/operators';
import { Endorsement } from '../models/endorsement';

@Component({
  selector: 'app-bill-of-exchange',
  templateUrl: './bill-of-exchange-detail.component.html',
  styleUrls: ['./bill-of-exchange-detail.component.scss'],
})
export class BillOfExchangeDetailComponent implements OnInit {
  id: number;
  billOfExchangeWithCurrentOwner: BillOfExchangeWithCurrentOwner;
  endorsementsColumns = ['id', 'billId', 'previousEndorsementId', 'newBeneficiary'];
  endorsements: Endorsement[] = [];
  isLoading = true;

  constructor(
    private apiClientService: ApiClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe((params) => {
      if (params.id) {
        this.id = params.id;

        this.apiClientService.getBillOfExchangeWithCurrentOwner(this.id).subscribe((result) => {
          if (result) {
            this.billOfExchangeWithCurrentOwner = result;
          }
        });

        this.apiClientService.getEndorsementsForBill(this.id).subscribe((result) => {
          if (result) {
            this.endorsements = result;
          }
        });
      }
    });
  }

  openPartyDetail(beneficiaryId: number) {
    this.router.navigate(['party'], { queryParams: { id: beneficiaryId } });
  }
}
