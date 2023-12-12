import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyViewWebComponent } from './property-view-web.component';

describe('PropertyViewWebComponent', () => {
  let component: PropertyViewWebComponent;
  let fixture: ComponentFixture<PropertyViewWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyViewWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyViewWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
