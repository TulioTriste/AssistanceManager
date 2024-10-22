import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/services/user.service';

@Component({
  selector: 'app-docente-perfil',
  templateUrl: './docente-perfil.page.html',
  styleUrls: ['./docente-perfil.page.scss'],
})
export class DocentePerfilPage implements OnInit {

  public userData: User | undefined;

  constructor(private router: Router, private navCtrl: NavController) {
    this.userData = history.state as User;
  }

  ngOnInit() {
  }

}
