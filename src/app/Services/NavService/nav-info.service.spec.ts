import { TestBed } from '@angular/core/testing';

import { NavInfoService } from './nav-info.service';

describe('NavInfoService', () => {
  let service: NavInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
