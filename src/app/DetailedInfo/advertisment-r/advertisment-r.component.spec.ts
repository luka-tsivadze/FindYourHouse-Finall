import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertismentRComponent } from './advertisment-r.component';

describe('AdvertismentRComponent', () => {
  let component: AdvertismentRComponent;
  let fixture: ComponentFixture<AdvertismentRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvertismentRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertismentRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
