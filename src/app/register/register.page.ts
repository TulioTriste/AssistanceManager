import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore'; // Importar Firestore
import { OnInit } from '@angular/core';
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
    date: '',
    category: '',
    password: '',
    password2: '',
    mail: ''
  };

  constructor(
    private router: Router,
    private toastController: ToastController,
    private firestore: Firestore // Inyección de Firestore
  ) {}

  ngOnInit() {}

  async register() {
    // Validar si todos los campos están llenos
    if (!this.user.name) {
      this.showAlert('Nombre');
    } else if (!this.user.surname) {
      this.showAlert('Apellidos');
    } else if (!this.user.age) {
      this.showAlert('Edad');
    } else if (!this.user.date) {
      this.showAlert('Fecha de Nacimiento');
    } else if (!this.user.category) {
      this.showAlert('Categoría');
    } else if (!this.user.mail) {
      this.showAlert('Correo');
    } else if (!this.user.password) {
      this.showAlert('Contraseña');
    } else if (!this.user.password2) {
      this.showAlert('Contraseña');
    } else if (!this.isPasswordStrong(this.user.password)) {
      this.showAlert('Contraseña no válida. Debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial.');
    } else if (this.user.password !== this.user.password2) {
      await this.showProblema();
    } else {
      // Guardar datos en Firestore
      try {
        const userRef = collection(this.firestore, 'users'); // Referencia a la colección
        await addDoc(userRef, this.user); // Agregar el documento
        await this.presentToast();
        this.router.navigate(['/folder/inbox']);
      } catch (error) {
        console.error('Error al registrar el usuario: ', error);
        await this.showAlert('Error al registrar el usuario. Inténtalo nuevamente.');
      }
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

  async showProblema() {
    const show = await this.toastController.create({
      message: 'Las contraseñas no coinciden. Inténtalo nuevamente.',
      duration: 3000,
      position: 'top',
      color: 'danger',
    });
    show.present();
  }

  // Función para validar si la contraseña es robusta
  isPasswordStrong(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
    return passwordRegex.test(password);
  }

  calcularEdad() {
    const hoy = new Date();
    const nacimiento = new Date(this.user.date);

    // Asegurarse de que la fecha de nacimiento sea válida
    if (isNaN(nacimiento.getTime())) {
      console.error('Fecha de nacimiento inválida');
      return "Ingrese el Año de Nacimiento";
    }

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    // Ajustar la edad si el mes actual es menor que el mes de nacimiento
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    return edad + ' Años';
  }
}
