import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentlivestreamsComponent } from './currentlivestreams.component';

describe('CurrentlivestreamsComponent', () => {
  let component: CurrentlivestreamsComponent;
  let fixture: ComponentFixture<CurrentlivestreamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentlivestreamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentlivestreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
