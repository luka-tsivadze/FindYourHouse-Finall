import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleRComponent } from './schedule-r.component';

describe('ScheduleRComponent', () => {
  let component: ScheduleRComponent;
  let fixture: ComponentFixture<ScheduleRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduleRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
