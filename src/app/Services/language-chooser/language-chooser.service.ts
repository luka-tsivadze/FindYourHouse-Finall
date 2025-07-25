import { Injectable, Injector } from '@angular/core';
import { EngService } from '../Languages/ForSidePages/eng/eng.service';
import { RusService } from '../Languages/ForSidePages/rus/rus.service';
import { GeoService } from '../Languages/ForSidePages/geo/geo.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageChooserService {
  localStorage: string = 'GEO';
  chosenLang: any;
  
  constructor(private injector: Injector) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('Language')) {
      this.localStorage = localStorage.getItem('Language');
    }
    
    // Only get the service we need
    switch (this.localStorage) {
      case 'ENG':
        this.chosenLang = this.injector.get(EngService);
        break;
      case 'GEO':
        this.chosenLang = this.injector.get(GeoService);
        break;
      case 'RUS':
        this.chosenLang = this.injector.get(RusService);
        break;
    }
  }
}
