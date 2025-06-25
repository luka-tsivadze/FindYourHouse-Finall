import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AllCardsService } from './Services/all-cards/all-cards.service';

import { NavigationError, Router } from '@angular/router';
import { ViewsService } from './Services/views/views.service';
import { LoadingServiceService } from './Services/LoadingServ/loading-service.service';
import { CurrencyService } from './Services/currency/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'FindYourHouse';
  loaded = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private CurrencyServ:CurrencyService ,private appService:LoadingServiceService,private allCardsService:AllCardsService, private navigate:Router ,private viewServ:ViewsService) {
  }
  ngOnInit(): void {

    this.appService.loading$.subscribe(loading => {
      this.loaded = loading;
    });


      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.style.display = 'none';
      }

    this.navigate.events.subscribe(event => {
      if (event instanceof NavigationError) {
        this.navigate.navigate(['/']);
      }
    });
    if(localStorage.getItem('Language') === null) {
      localStorage.setItem('Language','GEO');
  }

    this.viewServ.sendWebsiteView();
  }
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Use setTimeout to ensure scroll adjustment happens after other processes
      setTimeout(() => {
        window.scrollTo(0, 0);

      }, 1);
    }
  }

}
