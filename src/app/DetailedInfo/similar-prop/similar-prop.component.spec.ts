import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarPropComponent } from './similar-prop.component';

describe('SimilarPropComponent', () => {
  let component: SimilarPropComponent;
  let fixture: ComponentFixture<SimilarPropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimilarPropComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimilarPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
