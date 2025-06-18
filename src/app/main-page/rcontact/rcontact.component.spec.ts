import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RContactComponent } from './rcontact.component';

describe('RContactComponent', () => {
  let component: RContactComponent;
  let fixture: ComponentFixture<RContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
