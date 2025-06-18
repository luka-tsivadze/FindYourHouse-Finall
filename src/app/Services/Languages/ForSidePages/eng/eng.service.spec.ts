import { TestBed } from '@angular/core/testing';
import { EngService } from './eng.service';

describe('EngService', () => {
  let service: EngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
