import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillOfExchangeDetailComponent } from '@app/home/bill-of-exchange/bill-of-exchange-detail.component';
import { PartyDetailDialogComponent } from '@app/home/party-detail-dialog/party-detail-dialog.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { HomeComponent } from './home.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: marker('Home') } },
    { path: 'party', component: PartyDetailDialogComponent },
    { path: 'bill-of-exchange', component: BillOfExchangeDetailComponent },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
