import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoverpassPageRoutingModule } from './recoverpass-routing.module';

import { RecoverpassPage } from './recoverpass.page';
import { Recoverpass1Component } from '../vistas/recoverpass1/recoverpass1.component';
import { Recoverpass2Component } from '../vistas/recoverpass2/recoverpass2.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoverpassPageRoutingModule
  ],
  declarations: [RecoverpassPage,
    Recoverpass1Component,
    Recoverpass2Component
  ]
})
export class RecoverpassPageModule {}
