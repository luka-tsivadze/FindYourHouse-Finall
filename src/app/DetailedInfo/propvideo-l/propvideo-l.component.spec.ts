import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropvideoLComponent } from './propvideo-l.component';

describe('PropvideoLComponent', () => {
  let component: PropvideoLComponent;
  let fixture: ComponentFixture<PropvideoLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropvideoLComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropvideoLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
