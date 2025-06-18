import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsRComponent } from './tags-r.component';

describe('TagsRComponent', () => {
  let component: TagsRComponent;
  let fixture: ComponentFixture<TagsRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagsRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagsRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
