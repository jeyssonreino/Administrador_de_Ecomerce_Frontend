import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgergarUsuarioComponent } from './agergar-usuario.component';

describe('AgergarUsuarioComponent', () => {
  let component: AgergarUsuarioComponent;
  let fixture: ComponentFixture<AgergarUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgergarUsuarioComponent]
    });
    fixture = TestBed.createComponent(AgergarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
