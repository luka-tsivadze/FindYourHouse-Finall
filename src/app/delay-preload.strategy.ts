import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export class DelayPreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {

    if (route.path === 'allCards') {

   return new Observable(observer => {
  requestIdleCallback(() => {
    load().subscribe(observer);
  });
});

    }
    return of(null); 
  }
}
