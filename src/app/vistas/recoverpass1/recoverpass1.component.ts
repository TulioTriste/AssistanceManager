import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EmailService } from 'src/app/features/services/email.service';
import { Firestore, collection , query, where, getDocs, updateDoc, doc} from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/features/services/user.service';

@Component({
  selector: 'app-recoverpass1',
  templateUrl: './recoverpass1.component.html',
  styleUrls: ['./recoverpass1.component.scss'],
})
export class Recoverpass1Component implements OnInit {

  email: string = '';
  code: string = '';
  
  @Output() changeView = new EventEmitter<boolean>(); // Evento para cambiar la vista
  @Output() emailEmitter = new EventEmitter<string>();
  @Output() codeEmitter = new EventEmitter<string>();

  constructor(private emailService: EmailService, 
            private firestore: Firestore,
            private toastController: ToastController) { }

  ngOnInit() {}

  async onClick() {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('mail', '==', this.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await this.presentFailedToast();
      return;
    }

    this.code = this.generateRandomCode();

    // Convert querysnapshot to User
    const user = querySnapshot.docs[0].data() as User;

    // Email Service
    const email = this.email;
    const subject = "Hola " + user.name + "!";
    const message = "Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en AssistanceManager. Si no realizaste esta solicitud, por favor ignora este correo.\n\n" + 
    "Para restablecer tu contraseña, puedes utilizar el siguiente código:\n\n" + 
    "Código: " + this.code + "\n\n" +
    "Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte.\n\n" +
    "Gracias,\n" + 
    "El equipo de RegistrApp";

    const body = { subject, email, message };

    this.emailService.sendEmail(body).subscribe();

    this.changeView.emit(false); // Emitir el evento al componente padre
    this.emailEmitter.emit(this.email);
    this.codeEmitter.emit(this.code);
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

  async presentFailedToast() {
    const toast = await this.toastController.create({
      message: 'No se ha encontrado un usuario con este correo!',
      duration: 3000,
      position: 'top',
      color: 'warning',
    });
    toast.present();
  }
}
