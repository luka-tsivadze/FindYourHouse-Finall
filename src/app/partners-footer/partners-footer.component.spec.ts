import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersFooterComponent } from './partners-footer.component';

describe('PartnersFooterComponent', () => {
  let component: PartnersFooterComponent;
  let fixture: ComponentFixture<PartnersFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartnersFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnersFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
