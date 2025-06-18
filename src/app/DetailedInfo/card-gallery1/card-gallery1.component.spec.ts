import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGallery1Component } from './card-gallery1.component';

describe('CardGallery1Component', () => {
  let component: CardGallery1Component;
  let fixture: ComponentFixture<CardGallery1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardGallery1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardGallery1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
