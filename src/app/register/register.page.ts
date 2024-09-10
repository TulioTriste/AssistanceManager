import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importar ToastController

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {
    name: '',
    surname: '',
    age: '',
    level: '',
    password: ''
  };

  constructor(private router: Router, private toastController: ToastController) {}

  ngOnInit() {}

  async register() {
    // Validar si todos los campos están llenos
    if (!this.user.name) {
      this.showAlert('Nombre');
    } else if (!this.user.surname) {
      this.showAlert('Apellidos');
    } else if (!this.user.age) {
      this.showAlert('Edad');
    } else if (!this.user.level) {
      this.showAlert('Nivel');
    } else if (!this.user.password) {
      this.showAlert('Contraseña');
    } else if (!this.isPasswordStrong(this.user.password)) {
      this.showAlert('Contraseña no válida. Debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial.');
    } else {
      // Mostrar mensaje de éxito y redirigir al login
      await this.presentToast();
      this.router.navigate(['/folder/inbox']);
    }
  }

  // Función para mostrar una alerta en rojo cuando un campo está vacío o incorrecto
  async showAlert(message: string) {
    const toast = await this.toastController.create({
      message: `Error en el campo: ${message}`,
      duration: 3000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }

  // Función para mostrar un mensaje de éxito en verde
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Registro exitoso. Ahora puedes iniciar sesión.',
      duration: 3000,
      position: 'top',
      color: 'success',
    });
    toast.present();
  }

  // Función para validar si la contraseña es robusta
  isPasswordStrong(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
    return passwordRegex.test(password);
  }
}
