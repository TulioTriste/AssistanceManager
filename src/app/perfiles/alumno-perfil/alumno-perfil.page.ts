import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/services/user.service';

import { BarcodeScanner, BarcodeFormat, LensFacing } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-alumno-perfil',
  templateUrl: './alumno-perfil.page.html',
  styleUrls: ['./alumno-perfil.page.scss'],
})
export class AlumnoPerfilPage implements OnInit {

  qrCodeSt = "test";

  public userData: User | undefined;

  constructor(private router: Router, private navCtrl: NavController) {
    this.userData = history.state as User; // Cargar userData desde el estado de navegación
  }

  ngOnInit() {
  }

  async startScan() {
    // The camera is visible behind the WebView, so that you can customize the UI in the WebView.
    // However, this means that you have to hide all elements that should not be visible.
    // You can find an example in our demo repository.
    // In this case we set a class `barcode-scanner-active`, which then contains certain CSS rules for our app.
    document.querySelector('body')?.classList.add('barcode-scanner-active');
  
    // Add the `barcodeScanned` listener
    const listener = await BarcodeScanner.addListener(
      'barcodeScanned',
      async result => {
        console.log(result.barcode);
      },
    );
  
    // Start the barcode scanner
    await BarcodeScanner.startScan();
  };
  
  async stopScan() {
    // Make all elements in the WebView visible again
    document.querySelector('body')?.classList.remove('barcode-scanner-active');
  
    // Remove all listeners
    await BarcodeScanner.removeAllListeners();
  
    // Stop the barcode scanner
    await BarcodeScanner.stopScan();
  };
  
  async scanSingleBarcode() {
    return new Promise(async resolve => {
      document.querySelector('body')?.classList.add('barcode-scanner-active');
  
      const listener = await BarcodeScanner.addListener(
        'barcodeScanned',
        async result => {
          await listener.remove();
          document
            .querySelector('body')
            ?.classList.remove('barcode-scanner-active');
          await BarcodeScanner.stopScan();
          resolve(result.barcode);
        },
      );
  
      await BarcodeScanner.startScan();
    });
  };
  
  async scan() {
    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });
    return barcodes;
  };
  
  async isSupported() {
    const { supported } = await BarcodeScanner.isSupported();
    return supported;
  };
  
  async enableTorch() {
    await BarcodeScanner.enableTorch();
  };
  
  async disableTorch() {
    await BarcodeScanner.disableTorch();
  };
  
  async toggleTorch() {
    await BarcodeScanner.toggleTorch();
  };
  
  async isTorchEnabled() {
    const { enabled } = await BarcodeScanner.isTorchEnabled();
    return enabled;
  };
  
  async isTorchAvailable() {
    const { available } = await BarcodeScanner.isTorchAvailable();
    return available;
  };
  
  async setZoomRatio() {
    await BarcodeScanner.setZoomRatio({ zoomRatio: 0.5 });
  };
  
  async getZoomRatio() {
    const { zoomRatio } = await BarcodeScanner.getZoomRatio();
    return zoomRatio;
  };
  
  async getMinZoomRatio() {
    const { zoomRatio } = await BarcodeScanner.getMinZoomRatio();
    return zoomRatio;
  };
  
  async getMaxZoomRatio() {
    const { zoomRatio } = await BarcodeScanner.getMaxZoomRatio();
    return zoomRatio;
  };
  
  async openSettings() {
    await BarcodeScanner.openSettings();
  };
  
  async isGoogleBarcodeScannerModuleAvailable() {
    const { available } =
      await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    return available;
  };
  
  async installGoogleBarcodeScannerModule() {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  };
  
  async checkPermissions() {
    const { camera } = await BarcodeScanner.checkPermissions();
    return camera;
  };
  
  async requestPermissions() {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera;
  };

}
