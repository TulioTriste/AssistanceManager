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
    console.log(this.code + "   " + this.email);
    if (this.codeInput != this.code) {
      this.message = 'El codigo ingresado no es correcto';
      return;
    }

    // Validación de password

    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('mail', '==', this.email));
    const querySnapshot = await getDocs(q);

    console.log(this.email);

    if (!querySnapshot.empty) {
      // Obtener el primer documento (supuesto que no haya más de un usuario con ese email)
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(this.firestore, 'users', userDoc.id); // Referencia al documento específico
      await updateDoc(userRef, { password: this.newPassword }); // Actualizar el documento
      console.log("Password updated");
    } else {
      throw new Error('No se encontró el usuario con ese correo');
    }
    console.log(this.message);
  }
}
