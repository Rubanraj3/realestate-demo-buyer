import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamViewWebComponent } from './stream-view-web.component';

describe('StreamViewWebComponent', () => {
  let component: StreamViewWebComponent;
  let fixture: ComponentFixture<StreamViewWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamViewWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamViewWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
