import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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
    this.emailService.sendEmail(this.email, 
      "Cambio de contraseña", 
      "Codigo para Cambio de Contraseña\n\n" + this.code);

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
