import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/features/services/user.service';

import { Dialog } from '@capacitor/dialog';

@Component({
  selector: 'app-alumno-perfil',
  templateUrl: './alumno-perfil.page.html',
  styleUrls: ['./alumno-perfil.page.scss'],
})
export class AlumnoPerfilPage implements OnInit {

  public userData: User | undefined;

  constructor(private router: Router, private navCtrl: NavController) {
    this.userData = history.state as User; // Cargar userData desde el estado de navegación
  }

  ngOnInit() {}

  scan() {
    this.navCtrl.navigateForward('/scan-qr', {
      state: history.state,
    });
  }

  async presentAlert(): Promise<void> {
    await Dialog.alert({
      title: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
    });
  }
}
