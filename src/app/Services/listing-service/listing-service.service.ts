import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, map, observable, Observable, of, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingServiceService { 
  private editItemIdSubject = new BehaviorSubject<number | null>(null);
  editItemId$ = this.editItemIdSubject.asObservable();
private cachedmyCards$: Observable<any[]> | null = null;

 SubmitEdited$ = new BehaviorSubject<any>(null);
 callApiAgein:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  setEditItemId(el) {
    this.editItemIdSubject.next(el);
  }

  private itemsSubject = new BehaviorSubject<any[]>([]);
  items$ = this.itemsSubject.asObservable(); 
  updateItems(newItems: any[]): void {
    this.itemsSubject.next(newItems); // Emit new list
  }

  DelResponse$=new BehaviorSubject<any>(null);
  DeleteItem(id: number): Observable<any> {

    return this.http.post('del_my_house.php', { id_2: id }).pipe(
      tap((response) => console.log('Delete response:', response)), // ✅ Log response
      catchError((error) => {
        console.error('Error deleting item:', error);
        return of(null); // ✅ Return a safe value instead of throwing an error
      })
    );
  }
  
  getEditItemId(): number | null {
    return this.editItemIdSubject.getValue();
  }
  constructor(private http:HttpClient ) { }


  userData(): Observable<any[]> {
    if (this.cachedmyCards$ && this.callApiAgein.getValue() === false) {
      return this.cachedmyCards$;
    }else if(this.callApiAgein.getValue()===true){
      this.cachedmyCards$ = null; // Reset cached data to force a new API call
      this.callApiAgein.next(false);
    }

    const id = localStorage.getItem('id');
    if (!id) {
      return of([]); // Return an empty array if there's no id.
    }

    this.cachedmyCards$ = this.http.post<any[]>('get_my_houses.php', { id })
      .pipe(
        map((data: any[]) => {
          return data.map(element => {
            // Default image if parsing fails or no images exist.
            let firstImg = '../../../assets/Imges/StaticImg/CardImges/fp-2.jpg';
            try {
              const images = JSON.parse(element.fotoebi);
              if (Array.isArray(images) && images.length > 0) {
                firstImg = `houses/${element.amtvirtvelis_maili}/${element.gancxadebis_saidentifikacio_kodi}/photos/${images[0]}`;
              }
            } catch (error) {
              console.error('Error parsing fotoebi JSON:', error);
            }

            // Create a clean additionalInfo object without specific keys.
            const additionalInfo = { ...element };
            delete additionalInfo.idi;
            delete additionalInfo.satauri;
            delete additionalInfo.statusis_gaaqtiurebis_tarigi;
            delete additionalInfo.misamarti;

            return {
              id: element.idi,
              imgLink: firstImg,
              title: element.satauri || 'No Title',
              review: 3,              // Placeholder for actual logic
              reviewedAmount: 0,        // Placeholder for actual logic
              view: 0,                  // Placeholder for actual logic
              date: element.statusis_gaaqtiurebis_tarigi || 'No Date',
              location: element.misamarti || 'No Location',
              additionalInfo: { ...additionalInfo }
            };
          });
        }),
        catchError(error => {
          console.error('Error fetching data:', error);
          return of([]); // Return an empty array on error.
        }),
        shareReplay(1)
      );

    return this.cachedmyCards$;
  }

  
  private changeUserDataSubject = new BehaviorSubject<any>(null);
  changeUserData$ = this.changeUserDataSubject.asObservable();

  ChangeUserData(data: any): Observable<any> {
    this.cachedmyCards$ = null;

    this.http.post('change_user_data.php', data).subscribe({
      next: (response) => {
        console.log('Update response:', response);
        this.changeUserDataSubject.next(response);
      },
      error: (error) => {
        console.error('Error updating data:', error);
        this.changeUserDataSubject.next(null);
      }
    });
    this.userData();
    return this.changeUserData$;
  }

  
  private Views$ = new BehaviorSubject<any>([]);
  views(activePage: any[]): Observable<any[]> {
    const gancxadebisIds = activePage.map((element: any) => element.id).join(',');
    const gancxadebisArray = activePage.map((element: any) => element.id);
  
    if (!gancxadebisIds) {
      return of(activePage); // return as-is, no need for API calls
    }
  
    return forkJoin({
      get: this.http.get<any>('get-views-counted-data.php', {
        params: { gancxadebis_ids: gancxadebisIds }
      }).pipe(
        catchError(error => {
          console.error('GET request failed:', error);
          return of({}); // fallback to empty object
        }),
      ),
      post: this.http.post<any>('get-reviews-count.php', {
        gancxadebis_ids: gancxadebisArray
      }).pipe(
        catchError(error => {
          console.error('POST request failed:', error);
          return of({}); // fallback to empty object
        }),
      )
    }).pipe(
      map(({ get, post }) => {
        const combinedData = { ...get, ...post };
  
        return activePage.map((item: any) => ({
          ...item,
          view: combinedData[item.id] || 0
        }));
      })
    );
  }
  
  
  
   
}
