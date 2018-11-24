import { Component, OnInit, Input, ChangeDetectorRef  } from '@angular/core';
import {CurrencyExchangeService} from "../currency-exchange.service";
import {catchError, map, finalize} from "rxjs/internal/operators";

@Component({
  selector: 'app-exchange-history-component',
  templateUrl: './exchange-history.component.html',
  styleUrls: ['./exchange-history.component.scss']
})
export class ExchangeHistoryComponent implements OnInit {

  constructor(private currencyExchangeService: CurrencyExchangeService, private changeDetectorRef : ChangeDetectorRef ) { }
  loader: boolean = false;
  _currency: ExchangeRate;
  //Using set to reduce unneeded calls to backend
  @Input() set currency(currency: ExchangeRate){
    this._currency = currency;
    if (this._currency){
      this.getCurrencyHistory(this._currency.currency, true);
    }else{
      //couldn't find currency delete history:
      this.dataSource = [];
    }
  };
  _toCurrency: ExchangeRate;
  @Input() set toCurrency(currency: ExchangeRate){
    this._toCurrency =currency;
    if(currency){
      this.getCurrencyHistory(currency.currency, false);
    }else{
      this.toDataSource = [];
    }
  };
  durationList:Object[] = [{text:'7 days', timestamp: this.getDate(7)},
    {text:'14 days', timestamp: this.getDate(14)},
    {text:'30 days', timestamp: this.getDate(30)}];
  durationValue:Date =this.durationList[0]["timestamp"];

  displayedColumns: String[] = ["date", "exchange"];
  dataSource: Object[] = [];
  toDataSource: Object[] =[];
  statisticsDisplayedColumns:String[] = ["statistic", "value"];
  statisticsSource: Object[] = [];

  ngOnInit() {
  }
  getCurrencyHistory(currency: String, from: boolean){
    if (from && this._toCurrency && this._toCurrency.currency === currency ||
      !from && this._currency && this._currency.currency ===currency ){
      return;
    }
    if (currency && this.durationValue) {
      //Just a loader example
      this.loader = true;
     this.currencyExchangeService.getCurrencyHistory(currency.toUpperCase(), this.durationValue.toISOString())
        .pipe(
          catchError(error => {
            console.error(error);
            return [];
          }),
          map(currencyHistory => {
            this.statisticsSource =[
              {statistic: "Lowest"},
              {statistic: "Highest"},
              {statistic: "Average"}];
            const mappCurrency = currencyHistory.map((_currency, index) => {
              return {timestamp: new Date(_currency.timestamp), rate: parseFloat(_currency.rate), index};
            });
            //order by date (it will always return on wrong direction from b.e- i would use sort)
            return mappCurrency.slice().reverse();
          }),
          finalize(()=>{
            this.loader = false;
            //refresh view- problem with mat-table component
            this.changeDetectorRef.detectChanges();
          }))
        .subscribe(currencyHistory => {
          if (from){
            //clear dataSource - i had problem with refreshing the view on array = otherArray
            this.dataSource = currencyHistory;
          }else {
            //clear dataSource - i had problem with refreshing the view on array = otherArray
            this.toDataSource = currencyHistory;
          }

        });
    }
  }

  getCurrencyAllHistory(event){
    if (this._toCurrency){
      this.getCurrencyHistory(this._toCurrency.currency, false);
    }
    if (this._currency){
      this.getCurrencyHistory(this._currency.currency, true);
    }
  }
  private getDate(days:number):Date{
    const date = new Date();
    return new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
  }

}
import { Pipe, PipeTransform } from '@angular/core';
import {ExchangeRate} from "../exchangeRate.class.js";

//a pipe to calculate average between two currencies
@Pipe({
  name: 'average'
})
export class AveragePipe implements PipeTransform {
  transform(items: any[], items2: any[]): any {
    if (items.length + items2.length === 0 || items.length !== items2.length || !Array.isArray(items) || !Array.isArray(items2)){
      return 0;
    }
    const firstSum = items.reduce((a, b, index) =>a + (b.rate /items2[index].rate),0);
    return ( firstSum) /(items.length);
  }
}
@Pipe({
  name: 'high'
})
export class HighestPipe implements PipeTransform {
  transform(items: any[], items2: any[]): any {
    if (items.length + items2.length === 0 || items.length !== items2.length || !Array.isArray(items) || !Array.isArray(items2)){
      return 0;
    }
    return items.reduce((a, b, index) => Math.max(a , (b.rate /items2[index].rate)),-Infinity);
  }
}
@Pipe({
  name: 'low'
})
export class LowestPipe implements PipeTransform {
  transform(items: any[], items2: any[]): any {
    if (items.length + items2.length === 0 || items.length !== items2.length || !Array.isArray(items) || !Array.isArray(items2)){
      return 0;
    }
    return items.reduce((a, b, index) =>Math.min(a , (b.rate /items2[index].rate)),Infinity);
  }
}
