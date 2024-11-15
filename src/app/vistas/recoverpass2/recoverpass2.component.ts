import { Component, Input, OnInit } from '@angular/core';
import { Firestore, collection , query, where, getDocs, updateDoc, doc} from '@angular/fire/firestore';

@Component({
  selector: 'app-recoverpass2',
  templateUrl: './recoverpass2.component.html',
  styleUrls: ['./recoverpass2.component.scss'],
})
export class Recoverpass2Component  implements OnInit {

  @Input() code: string = '';
  @Input() email: string = '';

  message: string = '';

  codeInput: string = '';
  newPassword: string = '';

  constructor(private firestore: Firestore) { }

  ngOnInit() {}

  async onClick() {
    this.message = "";
    console.log(this.code + "   " + this.email);
    if (this.codeInput != this.code) {
      this.message = 'El codigo ingresado no es correcto';
      return;
    }

    // Validación de password
    if (!this.isPasswordStrong(this.newPassword)) {
      this.message = "La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial.";
      return;
    }

    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('mail', '==', this.email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(this.firestore, 'users', userDoc.id);
      await updateDoc(userRef, { password: this.newPassword });
      console.log("Password updated");
    } else {
      this.message = "No se encontró el usuario con ese correo."
      //throw new Error('No se encontró el usuario con ese correo');
    }
  }

  isPasswordStrong(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
    return passwordRegex.test(password);
  }
}
