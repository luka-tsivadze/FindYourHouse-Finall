import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { error } from 'console';
import { sign } from 'crypto';
import { BehaviorSubject, Observable, share, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

private cached$: Observable<any> | null = null;
public ShowAgent= signal<any | null>(null) ;
  constructor(private http :HttpClient) { }

  fetchAgentData(): Observable<any> {
    if (!this.cached$) {
      this.cached$ = this.http.get('get_sale_agents.php').pipe(
  
        shareReplay(1) // Cache the result
      );
    }
    return this.cached$; // Return cached observable
  }
}