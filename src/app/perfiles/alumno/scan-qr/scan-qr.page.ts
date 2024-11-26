import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/features/services/user.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {

  public userData: User | undefined;
  message = 'Nada';

  hasDevices: boolean = false;
  hasPermission: boolean = false;
  qrResult: string = '';

  constructor(private firestore: Firestore) {
    this.userData = history.state as User;
  }

  ngOnInit() {
  }

  onCodeResult(resultString: string): void {
    console.log('Result: ', resultString);
  }

  // async onEvent(e: ScannerQRCodeResult[], action?: any) {
  //   // e && action && action.pause();
  //   console.log('QR Code scanned:', e);
  //   const params = new URLSearchParams(e.toString());
  //   const docente = params.get('docente');
  //   const fecha = params.get('fecha');

  //   const doc = {
  //     docente: docente,
  //     fecha: fecha,
  //     asignatura: "Programación Movil",
  //   }

  //   const userRef = collection(this.firestore, 'asistencia'); // Referencia a la colección
  //   await addDoc(userRef, doc); // Agregar el documento
  //   this.message = 'DOcumento cargado correctamente';

  //   //this.presentToast();
  // }

}
