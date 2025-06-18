import { TestBed } from '@angular/core/testing';

import { RusService } from './rus.service';

describe('RusService', () => {
  let service: RusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
