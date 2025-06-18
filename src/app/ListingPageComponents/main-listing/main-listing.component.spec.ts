import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainListingComponent } from './main-listing.component';

describe('MainListingComponent', () => {
  let component: MainListingComponent;
  let fixture: ComponentFixture<MainListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
