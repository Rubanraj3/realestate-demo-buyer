import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutCartProductsComponent } from './without-cart-products.component';

describe('WithoutCartProductsComponent', () => {
  let component: WithoutCartProductsComponent;
  let fixture: ComponentFixture<WithoutCartProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithoutCartProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithoutCartProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
