import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { CardsResolverGuard } from './card-resolver-guard.guard';
import { AllCardsService } from '../Services/all-cards/all-cards.service';
import { NavInfoService } from '../Services/NavService/nav-info.service';
import { LoadingServiceService } from '../Services/LoadingServ/loading-service.service';
import { CurrencyService } from '../Services/currency/currency.service';

describe('CardsResolverGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => {
        const allCardsService = TestBed.inject(AllCardsService);
        const navserv = TestBed.inject(NavInfoService);
        const appService = TestBed.inject(LoadingServiceService);
        const currencyService = TestBed.inject(CurrencyService);
        return new CardsResolverGuard(allCardsService, navserv, appService, currencyService).resolve();
      });

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
