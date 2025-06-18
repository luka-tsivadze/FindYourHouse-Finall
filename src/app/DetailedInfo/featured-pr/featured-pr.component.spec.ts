import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedPRComponent } from './featured-pr.component';

describe('FeaturedPRComponent', () => {
  let component: FeaturedPRComponent;
  let fixture: ComponentFixture<FeaturedPRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturedPRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturedPRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
