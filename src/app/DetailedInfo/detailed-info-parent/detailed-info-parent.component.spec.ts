import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedInfoParentComponent } from './detailed-info-parent.component';

describe('DetailedInfoParentComponent', () => {
  let component: DetailedInfoParentComponent;
  let fixture: ComponentFixture<DetailedInfoParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailedInfoParentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailedInfoParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
