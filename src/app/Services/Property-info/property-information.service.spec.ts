import { TestBed } from '@angular/core/testing';

import { PropertyInformationService } from './property-information.service';

describe('PropertyInformationService', () => {
  let service: PropertyInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
