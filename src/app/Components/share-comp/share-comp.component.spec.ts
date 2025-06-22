import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareCompComponent } from './share-comp.component';

describe('ShareCompComponent', () => {
  let component: ShareCompComponent;
  let fixture: ComponentFixture<ShareCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShareCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
