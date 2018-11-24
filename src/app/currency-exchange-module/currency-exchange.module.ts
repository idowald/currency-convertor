import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CurrencyExchangeDashboardComponent
} from './currency-exchange-component/currency-exchange-dashboard.component';
import { MainConversionComponent } from './main-conversion-component/main-conversion.component';
import {
  AveragePipe, ExchangeHistoryComponent,
  HighestPipe, LowestPipe
} from "./exchange-history-component/exchange-history.component";
import {
  MatAutocompleteModule, MatButtonModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatOptionModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CurrencyExchangeService} from "./currency-exchange.service";
import {ConversionHistoryModule} from "../conversion-history-module/conversion-history.module";
import {HttpClientModule} from "@angular/common/http";
import {CurrencyPicker} from "./currency-exchange-component/currency-picker-component/currency-picker.component";


@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSnackBarModule,
    ConversionHistoryModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CurrencyExchangeDashboardComponent
  ],
  providers:[CurrencyExchangeService],
  declarations: [CurrencyExchangeDashboardComponent, MainConversionComponent, ExchangeHistoryComponent,
     CurrencyPicker, AveragePipe, HighestPipe, LowestPipe, CurrencyPicker]
})
export class CurrencyExchangeModule { }
