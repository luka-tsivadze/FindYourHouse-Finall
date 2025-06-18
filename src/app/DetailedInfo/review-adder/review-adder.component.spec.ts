import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAdderComponent } from './review-adder.component';

describe('ReviewAdderComponent', () => {
  let component: ReviewAdderComponent;
  let fixture: ComponentFixture<ReviewAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewAdderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
