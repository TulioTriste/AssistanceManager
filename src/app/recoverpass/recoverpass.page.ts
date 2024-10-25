import { Component, OnInit } from '@angular/core';
//import { ToastController } from '@ionic/angular';  // Importa el ToastController
import { EmailService } from '../features/services/email.service';

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.page.html',
  styleUrls: ['./recoverpass.page.scss'],
})
export class RecoverpassPage implements OnInit {

  email: string = '';

  constructor(private emailService: EmailService/*, private toastController: ToastController*/) { }

  ngOnInit() {
  }

  // async presentToast() {
  //   const toast = await this.toastController.create({
  //     message: 'Se ha enviado un correo de recuperación al Gmail ingresado. Revisa tu entrada.',
  //     duration: 3000,
  //     position: 'top',
  //     color: 'success',
  //   });
  //   toast.present();
  // }

  onSubmit() {
    this.emailService.sendEmail("Juan ALberto", this.email, "Test Message");
  }
}
