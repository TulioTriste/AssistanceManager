import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from '../services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public userData: User | undefined;
  public username = '';
  qrData: string = 'https://www.google.com';

  constructor(private router: Router, private navCtrl: NavController) {
    this.userData = history.state as User;

    if (this.userData != null) {
      this.username = this.userData?.name;
    } else {
      console.log("Error intentando cargar al usuario.")
    }
  }

  ngOnInit() {
  }

}
