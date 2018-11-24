import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header-component/header.component';
import { RoutingTabsComponent } from './routing-tabs-component/routing-tabs.component';
import {MatButtonModule, MatTabsModule, MatToolbarModule} from "@angular/material";
import {RouterModule} from "@angular/router";
import {LoginModule} from "../login-module/login.module";
import {CurrencyExchangeModule} from "../currency-exchange-module/currency-exchange.module";
import {ConversionHistoryModule} from "../conversion-history-module/conversion-history.module";

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    RouterModule,
    LoginModule,
    CurrencyExchangeModule,
    ConversionHistoryModule,
    MatToolbarModule
  ],
  declarations: [HeaderComponent, RoutingTabsComponent],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
