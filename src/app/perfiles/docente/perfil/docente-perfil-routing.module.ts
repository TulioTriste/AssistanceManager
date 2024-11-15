import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocentePerfilPage } from './docente-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: DocentePerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocentePerfilPageRoutingModule {}
