import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftAmentiesComponent } from './left-amenties.component';

describe('LeftAmentiesComponent', () => {
  let component: LeftAmentiesComponent;
  let fixture: ComponentFixture<LeftAmentiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeftAmentiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeftAmentiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
