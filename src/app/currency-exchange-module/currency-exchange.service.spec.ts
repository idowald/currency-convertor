import { TestBed,  async, inject } from '@angular/core/testing';

import {CurrencyExchangeService} from './currency-exchange.service';
import {CurrencyExchangeModule} from "./currency-exchange.module";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {ExchangeRate} from "./exchangeRate.class.js";

/**
 * An example for testing the backend and a service (if the backend/frontend was changed and it will corrupt our data- this will let us know
 */
describe('CurrencyExchangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports:[
    CurrencyExchangeModule,
    HttpClientModule
  ],
  providers: [
    CurrencyExchangeService,
    HttpClient
  ]}));

  it('should be created', () => {
    const service: CurrencyExchangeService = TestBed.get(CurrencyExchangeService);
    expect(service).toBeTruthy();
  });
  it("getMarketPrices function didn't changed", inject([CurrencyExchangeService],
    (currencyExchangeService:CurrencyExchangeService) => {
    expect(currencyExchangeService).toBeTruthy();
    expect(typeof currencyExchangeService.getMarketPrices === "function").toBeTruthy();
  }));

  it("getMarketPrices rates API didn't changed", async(inject([CurrencyExchangeService, HttpHandler],
    (currencyExchangeService: CurrencyExchangeService) => {
    const currenciesObservable = currencyExchangeService.getMarketPrices();
    currenciesObservable.subscribe((rates)=>{
        //just an example
        expect(rates.length).toBeGreaterThan(2);
        let exchangeRates = [];
        for (let rate of rates){
          //check data
          exchangeRates.push(new ExchangeRate(rate.currency,
            parseFloat(rate.rate.toString()),
            new Date(rate.timestamp)));
        }
        //check that all went through
        expect(exchangeRates.length).toBe(rates.length);
      },
      (error)=>{
      console.error(error);
      expect(1).toBeNaN();
      }
    );
  })));

});
