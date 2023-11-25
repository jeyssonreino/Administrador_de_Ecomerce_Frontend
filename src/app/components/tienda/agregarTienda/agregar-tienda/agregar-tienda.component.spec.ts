import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTiendaComponent } from './agregar-tienda.component';

describe('AgregarTiendaComponent', () => {
  let component: AgregarTiendaComponent;
  let fixture: ComponentFixture<AgregarTiendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarTiendaComponent]
    });
    fixture = TestBed.createComponent(AgregarTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
