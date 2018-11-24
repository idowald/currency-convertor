import { Component, OnInit, Input } from '@angular/core';
import {ExchangeRate} from "../exchangeRate.class.js";
@Component({
  selector: 'app-main-conversion-component',
  templateUrl: './main-conversion.component.html',
  styleUrls: ['./main-conversion.component.scss']
})
export class MainConversionComponent implements OnInit {
  @Input() amount: number;
  @Input() fromCurrency: String;
  @Input() toCurrency: String;
  @Input() exchangeRates: ExchangeRate[];
  constructor() { }

  ngOnInit() {
  }
  preCalculated ={};
  //a function that calculate the rate between two currencies with fast caching (if the value was already calculated)
  calculateRates(){
    if (!this.exchangeRates){
      return null;
    }
    const key = `${this.fromCurrency}_${this.toCurrency}`;
    if (this.preCalculated.hasOwnProperty(key )){
      //caching (Couldn't use a store)
      return this.preCalculated[key];
    }
    const fromRate = this.exchangeRates.find(rate=>rate.currency===this.fromCurrency);
    if (!fromRate){
      return null;
    }
    const toRate = this.exchangeRates.find(rate=>rate.currency===this.toCurrency);
    if (!toRate){
      return null;
    }
    const calc:any = (fromRate.rate)/toRate.rate;
    this.preCalculated[key] = calc;
    return calc;
  }

}
