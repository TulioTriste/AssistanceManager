import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  constructor(private router: Router) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  // Objeto JSON para usuario
  user = {
    username: '',
    password: '',
  };
  mensaje = '';
  spinner = false;

  // Añadido para la visibilidad de la contraseña
  passwordType: string = 'password';
  eyeIcon: string = 'eye-off'; // Por defecto el ojo está cerrado

  validar() {
    if (this.user.username.length != 0) {
      if (this.user.password.length != 0) {
        this.mensaje = 'Conexión exitosa';
        let navigationExtras: NavigationExtras = {
          state: {
            username: this.user.username,
            password: this.user.password,
          },
        };
        this.cambiarSpinner();
        setTimeout(() => {
          this.router.navigate(['/home'], navigationExtras);
          this.cambiarSpinner();
          this.mensaje = "";
        }, 2000);
      } else {
        this.mensaje = 'Contraseña vacía';
      }
    } else {
      this.mensaje = 'Usuario vacío';
    }
  }

  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.eyeIcon = 'eye'; // Ojo abierto
    } else {
      this.passwordType = 'password';
      this.eyeIcon = 'eye-off'; // Ojo cerrado
    }
  }

  cambiarSpinner() {
    this.spinner = !this.spinner;
  }
}
