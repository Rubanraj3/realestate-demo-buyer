import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchliveComponent } from './watchlive.component';

describe('WatchliveComponent', () => {
  let component: WatchliveComponent;
  let fixture: ComponentFixture<WatchliveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchliveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchliveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
