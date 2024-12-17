import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService, User } from '../features/services/user.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  constructor(
    private navCtrl: NavController,
    private userService: UserService
  ) {} // Reemplazamos Router con NavController

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  public userData: User | undefined;
  public user = { // Index Data
    email: '',
    password: '',
  };
  public mensaje = '';
  public spinner = false;

  // Añadido para la visibilidad de la contraseña
  passwordType: string = 'password';
  eyeIcon: string = 'eye-off'; // Por defecto el ojo está cerrado

  async validar() {
    if (this.user.email.length != 0) {
      if (this.user.password.length != 0) {
        const canLogin = await this.login(this.user.email, this.user.password);
        if (canLogin) {
          let navigationExtras: any = {
            state: this.userData
          };

          history.replaceState(this.userData, ''); // Así al volver a loguear no se queda la info anterior
          
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
          this.mensaje = 'Usuario o contraseña incorrectos';
        }
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

  async login(email: string, password: string): Promise<Boolean> {
    this.userData = await this.userService.getUser(email, password);
    if (this.userData != null) {
      return true;
    } else {
      return false;
    }
  }

  cambiarSpinner() {
    this.spinner = !this.spinner;
  }
}
