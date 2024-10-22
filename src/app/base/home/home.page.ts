import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public userData: User | undefined;
  public username = '';

  constructor(private router: Router, private navCtrl: NavController) {
    this.userData = history.state as User; // Cargar userData desde el estado de navegación

    if (this.userData != null) {
      this.username = this.userData.name;
    } else {
      console.log("Error intentando cargar al usuario.")
      this.navCtrl.navigateForward('/error_page');
      return;
    }
    //Console.log
    //Mensaje bienvenida
  }

  ngOnInit() {}

  async goPerfil() {
    console.log(this.userData?.category);
    if (this.userData?.category === "docente") {
      this.navCtrl.navigateForward('/docente-perfil', {
        state: history.state,
      });
    } else if (this.userData?.category === "estudiante") {
      this.navCtrl.navigateForward('/alumno-perfil', {
        state: history.state,
      });
    } else {
      console.log("Error intentando cargar al usuario.")
      this.navCtrl.navigateForward('/error_page', history.state);
    }
  }
}

