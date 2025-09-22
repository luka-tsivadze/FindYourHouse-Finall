import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatePickerComponentComponent } from './coordinate-picker-component.component';

describe('CoordinatePickerComponentComponent', () => {
  let component: CoordinatePickerComponentComponent;
  let fixture: ComponentFixture<CoordinatePickerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoordinatePickerComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinatePickerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
