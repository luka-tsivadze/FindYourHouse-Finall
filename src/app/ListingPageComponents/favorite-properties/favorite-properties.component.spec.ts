import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePropertiesComponent } from './favorite-properties.component';

describe('FavoritePropertiesComponent', () => {
  let component: FavoritePropertiesComponent;
  let fixture: ComponentFixture<FavoritePropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritePropertiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoritePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
