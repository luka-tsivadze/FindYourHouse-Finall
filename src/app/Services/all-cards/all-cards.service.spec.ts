import { TestBed } from '@angular/core/testing';

import { AllCardsService } from './all-cards.service';

describe('AllCardsService', () => {
  let service: AllCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
