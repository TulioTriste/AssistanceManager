import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/features/services/user.service';
import { NgxScannerQrcodeService, ScannerQRCodeResult  } from 'ngx-scanner-qrcode';
import { Firestore, collection, addDoc , query, where, getDocs} from '@angular/fire/firestore';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {

  public userData: User | undefined;

  constructor(private navCtrl: NavController,
              private scannerService: NgxScannerQrcodeService,
              private firestore: Firestore) {
    this.userData = history.state as User;
  }

  ngOnInit() {
  }

  async startScanning() {
    // this.scannerService.loadFiles().subscribe((result: ScannerQRCodeSelectedFiles[]) => {
    //   this.qrCodeResult = result;
    //   console.log('QR Code scanned:', this.qrCodeResult);
    //   const params = new URLSearchParams(result.toString());
    //   const docente = params.get('docente');
    //   const fecha = params.get('fecha');

    //   const doc = {
    //     docente: docente,
    //     fecha: fecha,
    //     asignatura: "Programación Movil",
    //   }

    //   const userRef = collection(this.firestore, 'users'); // Referencia a la colección
    //   addDoc(userRef, doc); // Agregar el documento

    //   console.log(`Asistencia registrada para ${docente} en la fecha ${fecha}`);

    // });
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    // e && action && action.pause();
    console.log(e);
  }

}
