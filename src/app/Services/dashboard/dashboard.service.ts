import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { NavInfoService } from '../NavService/nav-info.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private navServ: NavInfoService) {}

  Data = new BehaviorSubject<any>({ 
    gancxadebebi: 0, 
    shefasebebi: 0, 
    shetyobineba: 0, 
    dajavshnulebi: 0 
  });
  
  dashboardData = [{ amount: '345' }, { amount: '345' }, { amount: '345' }, { amount: '345' }];
  
  fetchDashboardData(): BehaviorSubject<any> {
    const userId = this.navServ.userId;
    if (!userId) {
      console.error("User ID is missing.");
      this.Data.next(this.dashboardData);
      return this.Data;
    }
  
    const params = new HttpParams().set('momxmareblis_idi', userId);
  
    this.http.get('get_counted_data.php', { params }).subscribe({
      next: (data: any) => {
        if (data && typeof data === 'object') {

          this.Data.next(data);
        } else {
          console.error('Invalid data format', data);
          this.Data.next(this.dashboardData);
        }
      },
      error: (err) => {
        console.error('Backend error', err);
        if (err.error && typeof err.error.text === 'string') {
          console.error('Raw response from server:', err.error.text);
        }
        this.Data.next(this.dashboardData);
      }
    });
  
    return this.Data;
  }
  
  

  




}
