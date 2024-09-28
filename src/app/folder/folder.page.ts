import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular'; // Importamos NavController

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  constructor(private navCtrl: NavController) {} // Reemplazamos Router con NavController

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  // Objeto JSON para usuario
  public user = {
    username: '',
    password: '',
  };
  public mensaje = '';
  public spinner = false;

  // Añadido para la visibilidad de la contraseña
  passwordType: string = 'password';
  eyeIcon: string = 'eye-off'; // Por defecto el ojo está cerrado

  validar() {
    if (this.user.username.length != 0) {
      if (this.user.password.length != 0) {
        let navigationExtras = {
          state: {
            username: this.user.username,
            password: this.user.password,
          },
        };
        this.mensaje = 'Conexión exitosa';

        this.cambiarSpinner();
        setTimeout(() => {
          this.cambiarSpinner();
          this.mensaje = "";

          // Navegamos con una animación personalizada
          this.navCtrl.navigateForward('/home', {
            animated: true,
            animationDirection: 'forward', // Establecemos la animación de deslizamiento hacia adelante
            state: navigationExtras.state,  // Pasamos el estado (datos)
          });
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
