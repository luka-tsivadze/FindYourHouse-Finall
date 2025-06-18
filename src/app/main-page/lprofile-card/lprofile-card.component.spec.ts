import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LprofileCardComponent } from './lprofile-card.component';

describe('LprofileCardComponent', () => {
  let component: LprofileCardComponent;
  let fixture: ComponentFixture<LprofileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LprofileCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LprofileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
