import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanQrPageRoutingModule } from './scan-qr-routing.module';

import { ScanQrPage } from './scan-qr.page';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanQrPageRoutingModule,
    NgxScannerQrcodeModule
  ],
  declarations: [ScanQrPage]
})
export class ScanQrPageModule {}
