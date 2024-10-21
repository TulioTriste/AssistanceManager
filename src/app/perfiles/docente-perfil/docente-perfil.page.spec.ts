import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocentePerfilPage } from './docente-perfil.page';

describe('DocentePerfilPage', () => {
  let component: DocentePerfilPage;
  let fixture: ComponentFixture<DocentePerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DocentePerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
