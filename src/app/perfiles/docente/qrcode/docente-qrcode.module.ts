import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocenteQrcodePageRoutingModule } from './docente-qrcode-routing.module';

import { DocenteQrcodePage } from './docente-qrcode.page';

import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocenteQrcodePageRoutingModule,
    QRCodeModule
  ],
  declarations: [DocenteQrcodePage]
})
export class DocenteQrcodePageModule {}
