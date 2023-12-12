import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeViewcomponentComponent } from './large-viewcomponent.component';

describe('LargeViewcomponentComponent', () => {
  let component: LargeViewcomponentComponent;
  let fixture: ComponentFixture<LargeViewcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeViewcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LargeViewcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
