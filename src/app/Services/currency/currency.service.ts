import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

    private currencySubject = new BehaviorSubject<string>('USD'); // default
  currency$ = this.currencySubject.asObservable();
  currencyRates

  constructor( private http:HttpClient){ }






  setCurrency(newCurrency: string) {
    this.currencySubject.next(newCurrency);
  }

  getCurrency(): string {
    return this.currencySubject.getValue();
  }

  fetCurrency(): Observable<any> {
  return this.http.get<any>('get_currencies.php').pipe(
    map((data) => {
        this.currencyRates = data;
      return data
    }),
    shareReplay(1)
  );
}
changeCurrency(
  currency: string,
  amount: number,
 CurrencyTo
) {
     let amountStr 
  if (typeof amount !== 'number' || isNaN(amount)) {
    amountStr = amount.toString();
    // Remove last character and check again

    if (!isNaN(Number(amountStr))) {
      amount = Number(amountStr);
    }
    
  }else{
    amountStr = amount.toString();
  }
  amountStr = amountStr.replace(/[\s,.]+/g, '');

  if (currency === '$') {
  return Math.round(Number(CurrencyTo.USD_to_GEL) * Number(amountStr));  
  } else if (currency === '₾') {
    return Math.round(CurrencyTo.GEL_to_USD * Number(amountStr));
  } else {
    console.error('Unsupported currency:', currency);
    return amount; // fallback if currency is neither GEL nor USD
  }
}
}
