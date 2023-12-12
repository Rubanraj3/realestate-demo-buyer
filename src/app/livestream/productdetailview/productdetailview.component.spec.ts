import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdetailviewComponent } from './productdetailview.component';

describe('ProductdetailviewComponent', () => {
  let component: ProductdetailviewComponent;
  let fixture: ComponentFixture<ProductdetailviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductdetailviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductdetailviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
