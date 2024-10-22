import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { loginGuard } from './guard/login.guard';

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
    loadChildren: () => import('./base/home/home.module').then(m => m.HomePageModule)
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
    path: 'error_page',
    loadChildren: () => import('./errorpage/errorpage.module').then(m => m.ErrorpagePageModule) // Asegúrate de que el nombre coincida
  },
  {
    path: 'docente-perfil',
    loadChildren: () => import('./perfiles/docente-perfil/docente-perfil.module').then( m => m.DocentePerfilPageModule),
    canActivate: [loginGuard]
  },
  {
    path: 'alumno-perfil',
    loadChildren: () => import('./perfiles/alumno-perfil/alumno-perfil.module').then( m => m.AlumnoPerfilPageModule),
    canActivate: [loginGuard]
  },
  {
    path: '**',
    redirectTo: 'error_page', // Redirige a la página de error
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
