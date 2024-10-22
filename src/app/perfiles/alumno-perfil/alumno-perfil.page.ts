import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/services/user.service';

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

  ngOnInit() {
  }

}
