import { TestBed } from '@angular/core/testing';

import { LanguageChooserService } from './language-chooser.service';

describe('LanguageChooserService', () => {
  let service: LanguageChooserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageChooserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
