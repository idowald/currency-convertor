import {Component, OnInit} from '@angular/core';
import {MyErrorStateMatcher} from "../../commons/myErrorStateMatcher";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { CurrencyExchangeService} from "../currency-exchange.service";
import { debounceTime, catchError} from "rxjs/internal/operators";
import {MatSnackBar} from '@angular/material';
import { map  } from 'rxjs/operators';
import {ConversionService} from "../../conversion-history-module/conversion-service/conversion.service";
import { ActivatedRoute } from '@angular/router';
import {ExchangeRate} from "../exchangeRate.class.js";

@Component({
  selector: 'app-currency-exchange-component',
  templateUrl: './currency-exchange-dashboard.component.html',
  styleUrls: ['./currency-exchange-dashboard.component.scss']
})
export class CurrencyExchangeDashboardComponent implements OnInit {
  exchangeRates:ExchangeRate[];
  fromValueControl = new FormControl();
  toValueControl = new FormControl();
  fromExchangeCurrency:ExchangeRate;
  toExchangeCurrency:ExchangeRate;
  matcher = new MyErrorStateMatcher();
  amountFormControl = new FormControl('',[
    Validators.required,
    Validators.min(1)
  ]);
  groupFormControl = new FormGroup({
    fromValueControl : this.fromValueControl,
    toValueControl: this.toValueControl,
    amountFormControl : this.amountFormControl
  });
  sub: any;
  subMarketPrices: any;
  subGroupChange: any;

  constructor(private currencyExchangeService: CurrencyExchangeService,
              private conversionService: ConversionService,
              private matSnackBar:MatSnackBar,
              private activatedRoute: ActivatedRoute) {  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      //i'm using timestamp as an id
      const timestamp = params['id'];
      if (!timestamp){
        return;
      }
      const conversion = this.conversionService.getConversion(new Date(timestamp));
      //in real production this code need to be protected in some class object
      if (conversion && conversion["amount"] && conversion["fromCurrency"] && conversion["toCurrency"] ){
          this.amountFormControl.setValue(conversion["amount"]);
          this.fromValueControl.setValue(conversion["fromCurrency"]);
          this.toValueControl.setValue(conversion["toCurrency"]);
          this.fromExchangeCurrency = new ExchangeRate(conversion["fromCurrency"],0,new Date());
          this.toExchangeCurrency = new ExchangeRate(conversion["toCurrency"],0,new Date());
        }else{
          //error couldn't find id
          this.matSnackBar.open("Error, Couldn't find id in params.","",{duration: 2000});
        }
      });
    this.getCurrencies();
    //use debounce for optimization on searching the currency
    this.subGroupChange = this.groupFormControl.valueChanges.pipe(debounceTime(1000)).subscribe((_val)=>{
      if (this.fromValueControl.value !== null && this.toValueControl.value !== null){
        //not ready for checking currency rates
        const fromValue = this.checkCurrencyInList(this.fromValueControl.value);
        this.fromExchangeCurrency = fromValue;
        const toValue = this.checkCurrencyInList(this.toValueControl.value);
        this.toExchangeCurrency = toValue;
      }
    });
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
    this.subMarketPrices.unsubscribe();
    this.subGroupChange.unsubscribe();
  }
  setFrom(value){
    this.fromValueControl.setValue(value)
  }

  setTo(value){
    this.toValueControl.setValue(value);
  }

  convert(){
    let toValue = this.checkCurrencyInList(this.toValueControl.value);
    let fromValue = this.checkCurrencyInList(this.fromValueControl.value);
    if (toValue  && fromValue && !this.amountFormControl.errors ){
      let rate = toValue.rate !== 0 ?parseInt(this.amountFormControl.value) * (fromValue.rate / toValue.rate): 0;
      this.conversionService.saveConversion(new Date(), this.amountFormControl.value,
        this.fromValueControl.value, this.toValueControl.value, rate);
      this.matSnackBar.open("Saved conversion",'',{duration: 2000});
    }else if (!toValue  || !fromValue ){
      //error couldn't find currencies
      let text= "Conversion name couldn't found: " + this.fromValueControl.value;
      if (!toValue){
        text =  "Conversion name couldn't found: "+  this.toValueControl.value;
      }
      this.matSnackBar.open("Couldn't save conversion", text
        ,{duration: 3000});
      return
    }
  }

  getCurrencies(){
    this.subMarketPrices = this.currencyExchangeService.getMarketPrices().pipe(
      map(rates=>{
        let ratesObjectArray =rates.map(rate=>{
          return new ExchangeRate(rate.currency,
            parseFloat(rate.rate.toString()),
            new Date(rate.timestamp));
        });
        return ratesObjectArray;
      }),
      catchError(error=>{
        console.error(error);
        return [];
      })).subscribe(rates=>{
      this.exchangeRates = rates;
    });


  }
  checkCurrencyInList(currency:String):ExchangeRate{
    return this.exchangeRates.find(_currency=> _currency.currency === currency);

  }
  swapCurrencies(){
    const temp = this.fromValueControl.value;
    this.setFrom(this.toValueControl.value);
    this.setTo(temp);
  }
}
