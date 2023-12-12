import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegUserMobileComponent } from './reg-user-mobile.component';

describe('RegUserMobileComponent', () => {
  let component: RegUserMobileComponent;
  let fixture: ComponentFixture<RegUserMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegUserMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegUserMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
