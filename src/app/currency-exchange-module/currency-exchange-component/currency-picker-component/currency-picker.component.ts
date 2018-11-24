import {Component, OnInit, Input} from '@angular/core';
import { FormControl } from "@angular/forms";
import {ExchangeRate} from "../../exchangeRate.class.js";

@Component({
  selector: 'app-currency-picker-component',
  templateUrl: './currency-picker.component.html',
})
export class CurrencyPicker implements OnInit{
  //Only the presented in UI
  filteredCurrencies: ExchangeRate[];
  //All Currencies
  @Input() currencyList: ExchangeRate[];
  //The label to represent on UI
  @Input() label: string;
  //The picked currency
  @Input() valueControl: FormControl;
  subscribeValueControl: any;
  constructor(){
  }
  ngOnInit(){
    //Every change on the input- re-filter the array
    this.subscribeValueControl = this.valueControl.valueChanges.subscribe(val=> {
        this.filteredCurrencies = this._filter(val);
      }
    );
  }
  ngOnDestroy(){
    this.subscribeValueControl.unsubscribe();
  }
  private _filter(value: string): ExchangeRate[]{
    return this.currencyList.filter(currency=>{
      return currency.currency.toLowerCase().includes(value.toLowerCase())
    });
  }
}
