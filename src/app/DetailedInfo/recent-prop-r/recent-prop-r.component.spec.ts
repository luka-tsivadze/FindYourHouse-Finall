import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPropRComponent } from './recent-prop-r.component';

describe('RecentPropRComponent', () => {
  let component: RecentPropRComponent;
  let fixture: ComponentFixture<RecentPropRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentPropRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentPropRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
