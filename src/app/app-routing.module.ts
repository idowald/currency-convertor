import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login-module/login-component/login.component";
import {CurrencyExchangeDashboardComponent} from "./currency-exchange-module/currency-exchange-component/currency-exchange-dashboard.component";
import {ConversionHistoryDashboardComponent} from "./conversion-history-module/conversion-history-dashboard/conversion-history-dashboard.component";

const routes: Routes = [
  { path: '', redirectTo: 'currencyExchange', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'currencyExchange', component: CurrencyExchangeDashboardComponent },
  { path: 'currencyExchange/:id', component: CurrencyExchangeDashboardComponent },
  { path: 'conversionHistory', component: ConversionHistoryDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
