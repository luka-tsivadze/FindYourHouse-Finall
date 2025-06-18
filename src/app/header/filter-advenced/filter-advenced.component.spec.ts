import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAdvencedComponent } from './filter-advenced.component';

describe('FilterAdvencedComponent', () => {
  let component: FilterAdvencedComponent;
  let fixture: ComponentFixture<FilterAdvencedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterAdvencedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterAdvencedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
