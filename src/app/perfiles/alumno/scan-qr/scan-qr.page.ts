import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/features/services/user.service';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Dialog } from '@capacitor/dialog';

export interface Asistencia {
  docente: string;
  fecha: string;
  asignatura: string;
  available: boolean;
  presentes: string[];
}

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
  hasResult: boolean = false;
  qrResult: string = '';

 constructor(private firestore: Firestore) {
    this.userData = history.state as User;
  }

  ngOnInit() {
  }

  async onCodeResult(resultString: string) {
    const qrId = resultString;

    const docRef = doc(this.firestore, 'asistencia', qrId);
    try {
      const querySnapshot = await getDoc(docRef);
      if (querySnapshot.exists()) {
        let data = querySnapshot.data() as Asistencia;
        const userName = this.userData?.name || '';

        if (data.available) {
          if (!data.presentes.includes(userName)) {
            data.presentes.push(userName);

            await updateDoc(docRef, {
              presentes: data.presentes
            });

            this.message = '¡Asistencia registrada!';
            await this.showSuccessAlert(); // Call success alert
          } else {
            this.message = 'Ya has sido registrado';
            await this.showAlreadyRegisteredAlert(); // Call already registered alert
          }

          this.hasResult = true;
        } else {
          this.message = 'La asistencia ya ha sido cerrada';
          await this.showClosedAlert(); // Call closed alert
        }
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }

  async presentAlert(): Promise<void> {
    await Dialog.alert({
      title: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
    });
  }

  async showSuccessAlert(): Promise<void> {
    await Dialog.alert({
      title: 'Registro de Asistencia',
      message: '¡Asistencia registrada correctamente!',
    });
  }

  async showAlreadyRegisteredAlert(): Promise<void> {
    await Dialog.alert({
      title: 'Registro de Asistencia',
      message: 'Ya has sido registrado en la asistencia.',
    });
  }

  async showClosedAlert(): Promise<void> {
    await Dialog.alert({
      title: 'Registro de Asistencia',
      message: 'La asistencia ya ha sido cerrada.',
    });
  }
}