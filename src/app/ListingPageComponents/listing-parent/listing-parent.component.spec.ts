import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingParentComponent } from './listing-parent.component';

describe('ListingParentComponent', () => {
  let component: ListingParentComponent;
  let fixture: ComponentFixture<ListingParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListingParentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListingParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
