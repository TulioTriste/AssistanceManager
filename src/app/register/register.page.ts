import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importar AlertController

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
    birthdate: '', // Asegúrate de agregar este campo si es necesario
  };

  constructor(private router: Router, private alertController: AlertController) {}

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
    } else {
      // Mostrar alerta de éxito y redirigir al login
      await this.showSuccessAlert();
      this.router.navigate(['/folder/inbox']);
    }
  }

  // Función para mostrar una alerta en rojo cuando un campo está vacío
  async showAlert(field: string) {
    const alert = await this.alertController.create({
      header: 'Campo Vacío',
      message: `El siguiente campo está vacío: ${field}`,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Función para mostrar una alerta en verde cuando el registro es exitoso
  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Registro Exitoso',
      message: 'Has sido registrado correctamente.',
      cssClass: 'success-alert', // Clase CSS personalizada
      buttons: ['OK']
    });

    await alert.present();
  }
}
