import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

    private currencySubject = new BehaviorSubject<string>(''); // it will transform to Value
  currency$ = this.currencySubject.asObservable();
  currencyRates;


  constructor( private http:HttpClient){

    if (localStorage.getItem('Currency')) {
      const storedCur= JSON.parse(localStorage.getItem('Currency'));
   this.setCurrency(storedCur.icon);
    }
   }






  setCurrency(newCurrency: string) {
    this.currencySubject.next(newCurrency);
  }

  getCurrency(): string {
    return this.currencySubject.getValue();
  }

private currencyRates$: Observable<any>;

fetCurrency(): Observable<any> {
  if (!this.currencyRates$ && !this.currencyRates) {
    this.currencyRates$ = this.http.get<any>('get_currencies.php').pipe(
      map((data) => {
        this.currencyRates = data;
        return data;
      }),
      shareReplay(1) // ✅ share & cache the response
    );
  }
  return this.currencyRates$;
}

changeCurrency(
  currency: string,
  amount: number,

) {

  if (!this.currencyRates) {
    console.warn(this.currencyRates);
  
  }
  const CurrencyTo = this.currencyRates;

  if (this.currencyRates === undefined) {
    
}
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
  } else if (currency===''){
    return amount; // if currency is not set, return the original amount
  
  }else{

    console.error('Unsupported currency:', currency);
    return amount;
  }
  
}
}
