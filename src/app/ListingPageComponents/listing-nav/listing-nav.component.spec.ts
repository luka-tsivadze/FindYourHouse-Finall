import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingNavComponent } from './listing-nav.component';

describe('ListingNavComponent', () => {
  let component: ListingNavComponent;
  let fixture: ComponentFixture<ListingNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListingNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListingNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
