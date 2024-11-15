import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocenteQrcodePage } from './docente-qrcode.page';

describe('DocenteQrcodePage', () => {
  let component: DocenteQrcodePage;
  let fixture: ComponentFixture<DocenteQrcodePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteQrcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
