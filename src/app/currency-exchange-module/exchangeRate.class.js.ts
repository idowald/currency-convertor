export class ExchangeRate{
  currency:String;
  rate: number;
  timestamp: Date;
  constructor(currency:String, rate:number, timestamp:Date){
    this.currency = currency;
    this.rate = rate;
    this.timestamp = timestamp;
  }
}
