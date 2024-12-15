import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/features/services/user.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-docente-qrcode',
  templateUrl: './docente-qrcode.page.html',
  styleUrls: ['./docente-qrcode.page.scss'],
})
export class DocenteQrcodePage implements OnInit {

  public userData: User | undefined;
  qrData: string = '';

  constructor(private firestore: Firestore) {
    this.userData = history.state as User;
  }

  async ngOnInit() {
    const fecha = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

    const assisRef = collection(this.firestore, 'asistencia'); // Referencia a la colección

    const doc = await addDoc(assisRef, {
      docente: this.userData?.name, 
      fecha: fecha, 
      asignatura: 'Programación Movil',
      available: true,
      presentes: [],
    }); // Agregar el documento

    console.log('Document written with ID: ', doc.id);
    this.qrData = doc.id;
  }

}
