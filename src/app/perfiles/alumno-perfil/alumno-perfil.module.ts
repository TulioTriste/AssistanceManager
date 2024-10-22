import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlumnoPerfilPageRoutingModule } from './alumno-perfil-routing.module';

import { AlumnoPerfilPage } from './alumno-perfil.page';

import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlumnoPerfilPageRoutingModule,
    QRCodeModule
  ],
  declarations: [AlumnoPerfilPage]
})
export class AlumnoPerfilPageModule {}
