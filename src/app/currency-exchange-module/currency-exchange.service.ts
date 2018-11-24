import { Injectable } from '@angular/core';
import {URL,KEY} from "../NomicAPIKey.js";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {ExchangeRate} from "./exchangeRate.class.js";


@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService {

  constructor(private httpClient: HttpClient) { }

  getMarketPrices(): Observable<ExchangeRate[]>{
    const marketURL = URL.replace("$RESOURCE", 'exchange-rates');
    let params = new HttpParams().set('key', KEY);
    return this.httpClient.get<ExchangeRate[]>(marketURL,{params});

  }
  getCurrencyHistory(currency:string, startTimestamp:string): Observable<Object[]>{
    https://api.nomics.com/v1/exchange-rates/history?key=2018-09-demo-dont-deploy-b69315e440beb145&currency=BTC&start=2018-04-14T00%3A00%3A00Z&end=2018-05-14T00%3A00%3A00Z
    const currencyHistoyURL = URL.replace('$RESOURCE', 'exchange-rates/history');
    let params = new HttpParams().set('key', KEY).set('currency', currency).set('start',startTimestamp);
    return this.httpClient.get<Object[]>(currencyHistoyURL, {params});
  }

}

