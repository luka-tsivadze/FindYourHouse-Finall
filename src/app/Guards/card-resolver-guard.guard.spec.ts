import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { CardsResolverGuard } from './card-resolver-guard.guard';
import { AllCardsService } from '../Services/all-cards/all-cards.service';
import { NavInfoService } from '../Services/NavService/nav-info.service';
import { LoadingServiceService } from '../Services/LoadingServ/loading-service.service';

describe('CardsResolverGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => {
        const allCardsService = TestBed.inject(AllCardsService);
        const navserv = TestBed.inject(NavInfoService);
        const appService = TestBed.inject(LoadingServiceService);
        return new CardsResolverGuard(allCardsService, navserv, appService).resolve();
      });

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
