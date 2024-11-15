import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocenteQrcodePage } from '../qrcode/docente-qrcode.page';

const routes: Routes = [
  {
    path: '',
    component: DocenteQrcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocenteQrcodePageRoutingModule {}
