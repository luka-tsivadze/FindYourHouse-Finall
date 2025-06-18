import { TestBed } from '@angular/core/testing';

import { FilterDataUniterService } from './filter-data-uniter.service';

describe('FilterDataUniterService', () => {
  let service: FilterDataUniterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterDataUniterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
