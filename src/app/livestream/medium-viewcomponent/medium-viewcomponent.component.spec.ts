import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumViewcomponentComponent } from './medium-viewcomponent.component';

describe('MediumViewcomponentComponent', () => {
  let component: MediumViewcomponentComponent;
  let fixture: ComponentFixture<MediumViewcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediumViewcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediumViewcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
