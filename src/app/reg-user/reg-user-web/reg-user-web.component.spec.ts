import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegUserWebComponent } from './reg-user-web.component';

describe('RegUserWebComponent', () => {
  let component: RegUserWebComponent;
  let fixture: ComponentFixture<RegUserWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegUserWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegUserWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
