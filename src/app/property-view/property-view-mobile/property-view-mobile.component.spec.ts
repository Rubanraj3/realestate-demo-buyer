import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyViewMobileComponent } from './property-view-mobile.component';

describe('PropertyViewMobileComponent', () => {
  let component: PropertyViewMobileComponent;
  let fixture: ComponentFixture<PropertyViewMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyViewMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyViewMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
