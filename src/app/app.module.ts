import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatTabsModule} from '@angular/material';
import {LoginModule} from "./login-module/login.module";
import {HeaderModule} from "./header-module/header.module";
import {CurrencyExchangeModule} from "./currency-exchange-module/currency-exchange.module";
import {ConversionHistoryModule} from "./conversion-history-module/conversion-history.module";
import { HttpClientModule }    from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    LoginModule,
    CurrencyExchangeModule,
    ConversionHistoryModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
