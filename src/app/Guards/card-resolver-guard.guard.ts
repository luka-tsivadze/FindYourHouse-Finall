import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AllCardsService } from '../Services/all-cards/all-cards.service';
import { catchError, forkJoin, Observable, of, tap, timeout } from 'rxjs';
import { NavInfoService } from '../Services/NavService/nav-info.service';
import { LoadingServiceService } from '../Services/LoadingServ/loading-service.service';

@Injectable({
  providedIn: 'root'
})
export class CardsResolverGuard implements Resolve<any> {
 userId;
  constructor(private allCardsService: AllCardsService , private navserv:NavInfoService, private appService:LoadingServiceService) {}

  resolve(): Observable<any> {
    this.appService.setLoading(false); 
 
    
    
    return forkJoin({
      cards: this.allCardsService.fetchDataFromApi().pipe(
        catchError(error => {
          console.error('⚠️ Error fetching cards:', error);
          return of([]); // ✅ Return empty array instead of failing
        })
      ),
      nav: this.navserv.getUserInfo(this.navserv.userId, true).pipe(
        catchError(error => {
          console.error('⚠️ Error fetching user info:', error);
          return of([]); // ✅ Return empty array instead of failing
        })
      )
    }).pipe(
      // ✅ If API takes more than 10 seconds, stop waiting
      timeout({ first: 11000, with: () => {
        console.warn('⏳ API took too long! Skipping...');
        return of({ cards: [], nav: [] });
      }}),
      tap(() => this.appService.setLoading(true))
    );
  }
}
