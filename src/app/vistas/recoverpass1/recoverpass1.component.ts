import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { response } from 'express';
import { EmailService } from 'src/app/features/services/email.service';

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

  constructor(private emailService: EmailService) { }

  ngOnInit() {}

  onClick() {
    this.code = this.generateRandomCode();

    // Email Service
    const email = this.email;
    const name = "Cambio de contraseña";
    const message = "Codigo para Cambio de Contraseña\n\n" + this.code;

    const body = { name, email, message };

    this.emailService.sendEmail(body).subscribe(response => {
      console.log("Correo Enviado:", response);
    }, Error => {
      console.log("Error al enviar correo:", Error);
    });

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
}
