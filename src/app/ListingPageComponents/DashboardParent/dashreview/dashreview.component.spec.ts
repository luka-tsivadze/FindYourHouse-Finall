import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashreviewComponent } from './dashreview.component';

describe('DashreviewComponent', () => {
  let component: DashreviewComponent;
  let fixture: ComponentFixture<DashreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
