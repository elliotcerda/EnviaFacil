import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosDetallesComponent } from './productos-detalles.component';

describe('ProductosDetallesComponent', () => {
  let component: ProductosDetallesComponent;
  let fixture: ComponentFixture<ProductosDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
