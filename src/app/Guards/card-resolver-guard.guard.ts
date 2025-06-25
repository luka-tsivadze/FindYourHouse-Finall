import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AllCardsService } from '../Services/all-cards/all-cards.service';
import { catchError, forkJoin, Observable, of, switchMap, tap, timeout } from 'rxjs';
import { NavInfoService } from '../Services/NavService/nav-info.service';
import { LoadingServiceService } from '../Services/LoadingServ/loading-service.service';
import { CurrencyService } from '../Services/currency/currency.service';

@Injectable({
  providedIn: 'root'
})
export class CardsResolverGuard implements Resolve<any> {
 userId;

constructor(
  private allCardsService: AllCardsService,
  private navserv: NavInfoService,
  private appService: LoadingServiceService,
  private CurrencyServ: CurrencyService
) {}

resolve(): Observable<any> {
  this.appService.setLoading(false);

  return this.CurrencyServ.fetCurrency().pipe(
    catchError(error => {
      console.error('⚠️ Error fetching currency:', error);
      return of([]); // Return empty array if currency fetch fails
    }),
    // After currency is fetched, proceed to forkJoin for cards and nav
    // Use switchMap to chain the observables
    switchMap(currency => 
      forkJoin({
        cards: this.allCardsService.fetchDataFromApi().pipe(
          catchError(error => {
            console.error('⚠️ Error fetching cards:', error);
            return of([]);
          })
        ),
        nav: this.navserv.getUserInfo(this.navserv.userId, true).pipe(
          catchError(error => {
            console.error('⚠️ Error fetching user info:', error);
            return of([]);
          })
        ),
        currency: of(currency)
      }).pipe(
        timeout({ first: 11000, with: () => {
          console.warn('⏳ API took too long! Skipping...');
          return of({ cards: [], nav: [], currency: [] });
        }}),
        tap(() => this.appService.setLoading(true))
      )
    )
  );
}
}