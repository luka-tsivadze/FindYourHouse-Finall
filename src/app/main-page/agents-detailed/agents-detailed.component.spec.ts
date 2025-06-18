import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsDetailedComponent } from './agents-detailed.component';

describe('AgentsDetailedComponent', () => {
  let component: AgentsDetailedComponent;
  let fixture: ComponentFixture<AgentsDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentsDetailedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentsDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
