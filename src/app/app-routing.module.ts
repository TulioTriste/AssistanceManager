import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { loginGuard } from './features/guard/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'recoverpass',
    loadChildren: () => import('./recoverpass/recoverpass.module').then(m => m.RecoverpassPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'docente-perfil',
    loadChildren: () => import('./perfiles/docente/perfil/docente-perfil.module').then( m => m.DocentePerfilPageModule),
    canActivate: [loginGuard]
  },
  {
    path: 'alumno-perfil',
    loadChildren: () => import('./perfiles/alumno/perfil/alumno-perfil.module').then( m => m.AlumnoPerfilPageModule),
    canActivate: [loginGuard]
  },
  {
    path: 'docente-qrcode',
    loadChildren: () => import('./perfiles/docente/qrcode/docente-qrcode.module').then( m => m.DocenteQrcodePageModule)
  },
  {
    path: 'scan-qr',
    loadChildren: () => import('./perfiles/alumno/scan-qr/scan-qr.module').then( m => m.ScanQrPageModule)
  },
  {
    path: 'error_page',
    loadChildren: () => import('./errorpage/errorpage.module').then(m => m.ErrorpagePageModule)
  },
  {
    path: '**',
    redirectTo: 'error_page', // Redirige a la página de error
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
