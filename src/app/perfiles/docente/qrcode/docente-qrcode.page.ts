import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/features/services/user.service';

@Component({
  selector: 'app-docente-qrcode',
  templateUrl: './docente-qrcode.page.html',
  styleUrls: ['./docente-qrcode.page.scss'],
})
export class DocenteQrcodePage implements OnInit {

  public userData: User | undefined;
  qrData: string = '';

  constructor(private router: Router, private navCtrl: NavController) {
    this.userData = history.state as User;
  }

  ngOnInit() {
    const fecha = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    this.qrData = `docente=${this.userData?.name} ${this.userData?.surname}&fecha=${fecha}`;
  }

}
