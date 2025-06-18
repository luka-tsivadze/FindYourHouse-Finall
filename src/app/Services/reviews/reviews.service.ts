import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, catchError, interval, Observable, of, startWith, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private reviewsSubject = new BehaviorSubject<any[]>([]);
  reviews$ = this.reviewsSubject.asObservable(); // Expose observable

  constructor(private http: HttpClient) {}

  fetchUserReviews(momxmareblis_id: string): Observable<any[]> {
    const params = new HttpParams().set('momxmareblis_id', momxmareblis_id);

    return this.http.get<any[]>('get-reviews.php', { params }).pipe(
      tap(reviews => this.reviewsSubject.next(reviews)) // Update BehaviorSubject
    );
  }

  cardReview$=new BehaviorSubject<any[]>([]);
  private cardReviewInterval$ = new BehaviorSubject<boolean>(true);

  fetchCardReviews(gancxadebis_idi: number): Observable<any[]> {
    const params = new HttpParams().set('gancxadebis_idi', gancxadebis_idi.toString());

    return this.cardReviewInterval$.pipe(
      switchMap((isFirstCall) => {
        if (isFirstCall) {
          this.cardReviewInterval$.next(false); // Disable interval for subsequent calls
          return interval(35000).pipe( // ⏳ Trigger request every 35 seconds
            startWith(0), // 🚀 Fetch immediately on subscription
            switchMap(() => this.http.get<any[]>('get_house_reviews.php', { params }).pipe(
              tap(data => {
                this.cardReview$.next(data); // ✅ Update BehaviorSubject
              }),
              catchError(error => {
                console.error('Error fetching reviews', error);
                this.cardReview$.next([]);
                return of([]);
              })
            ))
          );
        } else {
          // Immediate API call without interval
          return this.http.get<any[]>('get_house_reviews.php', { params }).pipe(
            tap(data => {
              this.cardReview$.next(data); // ✅ Update BehaviorSubject
            }),
            catchError(error => {
              console.error('Error fetching reviews', error);
              this.cardReview$.next([]);
              return of([]);
            })
          );
        }
      })
    );
  }
  private websiteReviewsSubject = new BehaviorSubject<any[]>([]);
  fetchWebsiteReviews(): Observable<any> {
   if (this.websiteReviewsSubject.getValue().length > 0 || this.websiteReviewsSubject.getValue() !== null) {
      return of(this.websiteReviewsSubject.getValue()); // Return cached data if available
    
   }

    return this.http.get<any[]>('get_site_reviews.php ').pipe(
      tap(reviews => this.websiteReviewsSubject.next(reviews))// Update BehaviorSubject
    );
  }

  WebSiteReviewAdder$=new BehaviorSubject<any>([]);
  AddWebsiteReview(review: any):Observable<any>{
 this.http.post('send_site_review.php', review).subscribe({
next: (data: { status: string }) => { 

this.WebSiteReviewAdder$.next(data.status); 
},
error: (error) => { console.error(error);
  this.WebSiteReviewAdder$.next([]); 
 },

})
return this.WebSiteReviewAdder$;  
}
}
