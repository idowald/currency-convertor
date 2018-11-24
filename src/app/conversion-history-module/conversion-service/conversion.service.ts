import { Injectable } from '@angular/core';
const STORAGE_NAME = "allConversions";
@Injectable({
  providedIn: 'root'
})
/**
 * Please note- i did it with localStorage, not localDB like https://agnostic.github.io/LocalDB.js/ because i was short in time :)
 * I used the conversion timestamp as an id
 * The localstorage is build as hashmap for optimization:
 * 1. The main storage which contain a list with all the ids of the conversions.
 * 2. each conversion is saved on it's own on localStorage
 *
 * P.S the best way is using localStorageDB than using toJSON/fromJSON because it's an heavy operation
 */
export class ConversionService {
  constructor() {
    if (typeof(Storage) === "undefined") {
      console.error("sorry, your browser doesn't support localStorage- i will implement cookies as well if needed");
    }else{
      if (!localStorage.hasOwnProperty(STORAGE_NAME)){
        localStorage.setItem(STORAGE_NAME,"[]");
      }
    }
  }
  saveConversion(timestamp:Date, amount: number, fromCurrency:string, toCurrency:string, rate:number){
    const data = {timestamp, amount, fromCurrency, toCurrency, rate};
    let storage = this.getStorage();
    storage.push(timestamp.toISOString());
    localStorage.setItem(STORAGE_NAME, JSON.stringify(storage));
    localStorage.setItem(timestamp.toISOString(), JSON.stringify(data));

  }

  /**
   * delete a conversion and return if the conversion was deleted or not
   * @param {Date} timestamp
   * @returns {boolean}
   */
  deleteConversion(timestamp: Date): boolean{
    const storage = this.getStorage();
    const index = storage.findIndex(_timestamp=> _timestamp === timestamp.toISOString());
    if (index >=0 ){
      storage.splice(index,1);
      localStorage.setItem(STORAGE_NAME, JSON.stringify(storage));
      localStorage.removeItem(timestamp.toISOString());
      return true;
    }
    return false;
  }
  getStorage():string[]{
    if (localStorage[STORAGE_NAME]){
      return JSON.parse(localStorage.getItem(STORAGE_NAME));
    }else{
      return [];
    }
  }
  getAllConversions(): object[]{
    let storage = this.getStorage();
    let allConversions =[];
    for(let timestamp of storage){
      const conversion = this.getConversion(new Date(timestamp.toString()));
      allConversions.push(conversion);
    }
    return allConversions;
  }
  getConversion(timestamp: Date):object{
    return JSON.parse(localStorage.getItem(timestamp.toISOString()));
  }
}
export class Conversion{

}
