import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyLComponent } from './nearby-l.component';

describe('NearbyLComponent', () => {
  let component: NearbyLComponent;
  let fixture: ComponentFixture<NearbyLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NearbyLComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NearbyLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
