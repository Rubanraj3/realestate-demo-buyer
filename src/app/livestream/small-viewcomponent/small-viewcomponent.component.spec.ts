import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallViewcomponentComponent } from './small-viewcomponent.component';

describe('SmallViewcomponentComponent', () => {
  let component: SmallViewcomponentComponent;
  let fixture: ComponentFixture<SmallViewcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallViewcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallViewcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
