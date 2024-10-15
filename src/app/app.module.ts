import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ShowBackButtonDirective } from './show-back-button.directive'; // Importa la directiva

@NgModule({
  declarations: [
    AppComponent,
    ShowBackButtonDirective // Declara la directiva
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({ 
      apiKey: "AIzaSyBwLmwNEci3IDWE3pVoMVxjo6JU-Dnnps4",
      authDomain: "assistancemanager-70b10.firebaseapp.com",
      projectId: "assistancemanager-70b10",
      storageBucket: "assistancemanager-70b10.appspot.com",
      messagingSenderId: "372561889746",
      appId: "1:372561889746:web:f7c6374bfd04dcda94200b",
      measurementId: "G-CKWTXG7FNG" })),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
