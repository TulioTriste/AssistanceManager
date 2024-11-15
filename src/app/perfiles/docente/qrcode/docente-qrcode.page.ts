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

  qrCodeSt = 'https://google.com/'

  constructor(private router: Router, private navCtrl: NavController) {
    this.userData = history.state as User;
  }

  ngOnInit() {
  }

}
