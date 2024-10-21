import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocentePerfilPageRoutingModule } from './docente-perfil-routing.module';

import { DocentePerfilPage } from './docente-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocentePerfilPageRoutingModule
  ],
  declarations: [DocentePerfilPage]
})
export class DocentePerfilPageModule {}
