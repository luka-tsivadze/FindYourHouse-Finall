import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewsService {

  constructor(private http:HttpClient ) { }

  lestId;
  sendView(id:number){
    if(this.lestId==id){
      return;
    }
    this.lestId=id;

    this.http.post('counter_views.php', {gancxadebis_idi:id}).subscribe({

    error: (err) => {
      console.error('Error occurred while sending view:', err.message);
      console.error('Error details:', err);
    }
    });
  }
  sendWebsiteView(){
    this.http.post('counter_visitors.php','').subscribe({

    error: (err) => {
      console.error('Error occurred while sending view:', err.message);
      console.error('Error details:', err);
    }
    });
  }
  getCardViews(id):Observable<any>{
    const params = new HttpParams().set('gancxadebis_idi', id);
    return this.http.get('get_house_views.php', { params });
  }
}
