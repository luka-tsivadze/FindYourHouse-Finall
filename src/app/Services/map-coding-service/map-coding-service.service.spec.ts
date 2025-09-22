import { TestBed } from '@angular/core/testing';

import { MapCodingServiceService } from './map-coding-service.service';

describe('MapCodingServiceService', () => {
  let service: MapCodingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapCodingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
