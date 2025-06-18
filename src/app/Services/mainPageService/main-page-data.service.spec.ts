import { TestBed } from '@angular/core/testing';

import { MainPageDataService } from './main-page-data.service';

describe('MainPageDataService', () => {
  let service: MainPageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainPageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
