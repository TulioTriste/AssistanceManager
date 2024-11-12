import { Component, OnInit } from '@angular/core';
//import { ToastController } from '@ionic/angular';  // Importa el ToastController
import { EmailService } from '../features/services/email.service';
import { response } from 'express';

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.page.html',
  styleUrls: ['./recoverpass.page.scss'],
})
export class RecoverpassPage implements OnInit {

  view: string = 'default';

  email: string = '';

  code: string = '';

  constructor(private emailService: EmailService/*, private toastController: ToastController*/) { }

  ngOnInit() { }

  onSubmit() {
    this.code = this.generateRandomCode();

    this.emailService.sendEmail(this.email, 
      "Cambio de contraseña", 
      "Codigo para Cambio de Contraseña\n\n" + this.code)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );

    this.view = 'code';
  }

  generateRandomCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }

    return code;
  }
}
