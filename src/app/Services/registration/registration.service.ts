import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiUrl = 'http://smsoffice.ge/api/v2/send'; // API URL
  private apiKey = '01a8e8c6ff9d47b6b12883231492166b'; // Your API Key (better to store in backend, not here)
  private sender = 'findhouse.ge';
  // Create a BehaviorSubject to hold the 'displayer' state (default is false)
  private displayerSubject = new BehaviorSubject<boolean>(false);

  // Expose the observable so components can subscribe to changes
  displayer$ = this.displayerSubject.asObservable();
  displayerFirst$ = this.displayerSubject.asObservable();
  constructor(private http:HttpClient) {}

  // Method to update the displayer value
  setDisplayer(value: boolean) {
    this.displayerSubject.next(value);
  
      this.displayer$ = this.displayerSubject.asObservable();
    
  }
  login = true;

  toggleLogin(isLogin: boolean): void {
    this.login = isLogin;

  }
  // Method to get the current displayer value
  getDisplayerValue() {
    return this.displayerSubject.getValue();
  }
  sendSMS(phoneNumber: string, randomCode: string): Observable<any> {
    const data = {
      key: this.apiKey,
      destination: phoneNumber,
      sender: this.sender,
      content: randomCode
    };

    return this.http.post(this.apiUrl, data);
  }
  PasswordCode(code: any, Maili: any): Observable<any> {
  const lang= localStorage.getItem('Language')
    return this.http.post('send_mail_code.php', {
      code: code,
      Maili: Maili,
      Int_ena:lang
    });
  }
 PasswordReset(NewPassword: any, Maili: any,): Observable<any> {{

    return this.http.post('renew_password.php ', {
      NewPassword: NewPassword,
      Maili: Maili,
 });
}
}
}
