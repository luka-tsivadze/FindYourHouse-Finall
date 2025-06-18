import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingFooterComponent } from './listing-footer.component';

describe('ListingFooterComponent', () => {
  let component: ListingFooterComponent;
  let fixture: ComponentFixture<ListingFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListingFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListingFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
