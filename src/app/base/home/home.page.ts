import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  username = '';

  constructor(private router: Router, private navCtrl: NavController) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      username: '';
      password: '';
    };
    this.username = state.username;
    //Console.log
    //Mensaje bienvenida
  }

  ngOnInit() {}

  goPerfil() {
    let navigationExtras = {
      state: {
        username: this.username,
        //category: this.user.category,
      },
    };
    this.navCtrl.navigateForward('/perfil', {
      animated: true,
      animationDirection: 'forward', // Establecemos la animación de deslizamiento hacia adelante
      state: navigationExtras.state,  // Pasamos el estado (datos)
    });
  }
}

