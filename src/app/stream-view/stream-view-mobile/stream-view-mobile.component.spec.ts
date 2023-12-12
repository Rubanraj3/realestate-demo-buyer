import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamViewMobileComponent } from './stream-view-mobile.component';

describe('StreamViewMobileComponent', () => {
  let component: StreamViewMobileComponent;
  let fixture: ComponentFixture<StreamViewMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamViewMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamViewMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
