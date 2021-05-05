import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PartyDetailDialogComponent } from './party-detail-dialog/party-detail-dialog.component';
import { BillOfExchangeDetailComponent } from './bill-of-exchange/bill-of-exchange-detail.component';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, FlexLayoutModule, MaterialModule, HomeRoutingModule],
  declarations: [HomeComponent, PartyDetailDialogComponent, BillOfExchangeDetailComponent],
  entryComponents: [PartyDetailDialogComponent],
})
export class HomeModule {}
