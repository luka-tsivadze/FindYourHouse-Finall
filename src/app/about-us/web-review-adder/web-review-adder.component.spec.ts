import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebReviewAdderComponent } from './web-review-adder.component';

describe('WebReviewAdderComponent', () => {
  let component: WebReviewAdderComponent;
  let fixture: ComponentFixture<WebReviewAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebReviewAdderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebReviewAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
