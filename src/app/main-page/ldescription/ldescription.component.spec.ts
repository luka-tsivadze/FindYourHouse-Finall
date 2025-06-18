import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LDescriptionComponent } from './ldescription.component';

describe('LDescriptionComponent', () => {
  let component: LDescriptionComponent;
  let fixture: ComponentFixture<LDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
