import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export class DelayPreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Decide which routes to preload
    if (route.path === 'allCards/:id') {
      // Delay 3s after app is stable
      return timer(3000).pipe(mergeMap(() => load()));
    }
    return of(null); // Skip preloading for other routes
  }
}
