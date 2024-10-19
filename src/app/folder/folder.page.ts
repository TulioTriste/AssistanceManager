import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular'; // Importamos NavController
import { Firestore, collection, query, where, getDocs, QuerySnapshot, DocumentData} from '@angular/fire/firestore';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  constructor(
    private navCtrl: NavController,
    private firestore: Firestore
  ) {} // Reemplazamos Router con NavController

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  
  // Objeto JSON para usuario
  public user = {
    email: '',
    password: '',
    name: '',
    surname: '',
    age: '',
    date: '',
    category: '', // Categoria mediante numeros (0: Nulo, 1: Docente, 2: Estudiante)
  };
  public mensaje = '';
  public spinner = false;

  // Añadido para la visibilidad de la contraseña
  passwordType: string = 'password';
  eyeIcon: string = 'eye-off'; // Por defecto el ojo está cerrado

  async validar() {
    if (this.user.email.length != 0) {
      if (this.user.password.length != 0) {
        let navigationExtras: any = {
          state: {
            email: this.user.email,
            password: this.user.password,
            //category: this.user.category,
          },
        };

        const userExists = await this.checkIfUserExists(this.user.email, this.user.password);
        if (userExists) {
          this.mensaje = 'Conexión exitosa';

          // const user = await this.getUserData(this.user.email, this.user.password);
          // const usersData: any[] = [];

          // user.forEach((doc) => {
          //     const data = doc.data();
          //     usersData.push({...data }); // Incluye el ID del documento
          // });
          // navigationExtras.state = usersData;
          // this.mensaje = navigationExtras.state;

          this.cambiarSpinner();
          setTimeout(() => {
            this.cambiarSpinner();
            this.mensaje = "";

            // Navegamos con una animación personalizada
            this.navCtrl.navigateForward('/home', {
              animated: true,
              animationDirection: 'forward', // Establecemos la animación de deslizamiento hacia adelante
              state: navigationExtras.state,  // Pasamos el estado (datos)
            });
          }, 2000);
        } else {
          this.mensaje = 'Usuario o contraseña incorrectos';
        }
      } else {
        this.mensaje = 'Contraseña vacía';
      }
    } else {
      this.mensaje = 'Usuario vacío';
    }
  }
  
  // Función para verificar si el usuario ya existe en Firestore
  async checkIfUserExists(email: string, password: string): Promise<boolean> {
    const userRef = collection(this.firestore, 'users'); // Referencia a la colección de usuarios
    const q = query(
      userRef, 
      where('mail', '==', email),
      where('password', '==', password)); // Consulta para buscar el correo
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty; // Si no está vacío, el usuario ya existe
  }

  // Función de la data del usuario cargada
  async getUserData(email: string, password: string): Promise<QuerySnapshot<DocumentData, DocumentData>> {
    const userRef = collection(this.firestore, 'users'); // Referencia a la colección de usuarios
    const q = query(
      userRef, 
      where('mail', '==', email),
      where('password', '==', password)); // Consulta para buscar el correo

    return await getDocs(q); // Si no está vacío, el usuario
  }

  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.eyeIcon = 'eye'; // Ojo abierto
    } else {
      this.passwordType = 'password';
      this.eyeIcon = 'eye-off'; // Ojo cerrado
    }
  }

  cambiarSpinner() {
    this.spinner = !this.spinner;
  }

  // ejecutarSwitch() {
  //   switch (this.user.category) {
  //     case "Docente":
  //       return 
  //   }
  // }
}
