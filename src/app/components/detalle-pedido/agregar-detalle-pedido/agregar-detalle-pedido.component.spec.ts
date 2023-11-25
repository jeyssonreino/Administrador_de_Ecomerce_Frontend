import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDetallePedidoComponent } from './agregar-detalle-pedido.component';

describe('AgregarDetallePedidoComponent', () => {
  let component: AgregarDetallePedidoComponent;
  let fixture: ComponentFixture<AgregarDetallePedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarDetallePedidoComponent]
    });
    fixture = TestBed.createComponent(AgregarDetallePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
