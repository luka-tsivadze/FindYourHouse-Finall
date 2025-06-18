import { Injectable } from '@angular/core';
import { EngService } from '../Languages/ForSidePages/eng/eng.service';
import { RusService } from '../Languages/ForSidePages/rus/rus.service';
import { GeoService } from '../Languages/ForSidePages/geo/geo.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageChooserService {
  localStorage: string='GEO';
  chosenLang: any;

  constructor(private eng:EngService , private rus:RusService , private Geo:GeoService) { 
    if (typeof localStorage !== 'undefined' && localStorage.getItem('Language')) {
      this.localStorage = localStorage.getItem('Language');
    }
      switch (this.localStorage) {
        case 'ENG':
          this.chosenLang = this.eng;
          break;
        case 'GEO':
          this.chosenLang = this.Geo;
          break;
          
        case 'RUS':
          this.chosenLang= this.rus;
          break;
          
    
      }
    
  }
}
