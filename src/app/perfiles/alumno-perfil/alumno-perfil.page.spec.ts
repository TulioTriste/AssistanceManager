import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlumnoPerfilPage } from './alumno-perfil.page';

describe('AlumnoPerfilPage', () => {
  let component: AlumnoPerfilPage;
  let fixture: ComponentFixture<AlumnoPerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
