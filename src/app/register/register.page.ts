import { Component } from '@angular/core';
import { Firestore, collection, addDoc , query, where, getDocs} from '@angular/fire/firestore'; // Importar Firestore
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
      // Verificar si el usuario ya existe
      const userExists = await this.checkIfUserExists(this.user.mail);

      if (userExists) {
        // Mostrar mensaje de error si el usuario ya existe
        this.Badmessage('Este correo ya está registrado. Por favor, utiliza otro.');
      } else {
        // Guardar datos en Firestore si no existe
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
  }

  // Función para verificar si el usuario ya existe en Firestore
  async checkIfUserExists(email: string): Promise<boolean> {
    const userRef = collection(this.firestore, 'users'); // Referencia a la colección de usuarios
    const q = query(userRef, where('mail', '==', email)); // Consulta para buscar el correo
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty; // Si no está vacío, el usuario ya existe
  }

  async Badmessage(message: string) {
    const toast = await this.toastController.create({
      message: `${message}`,
      duration: 4000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
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
}
