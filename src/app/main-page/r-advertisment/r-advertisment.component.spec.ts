import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RAdvertismentComponent } from './r-advertisment.component';

describe('RAdvertismentComponent', () => {
  let component: RAdvertismentComponent;
  let fixture: ComponentFixture<RAdvertismentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RAdvertismentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RAdvertismentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
