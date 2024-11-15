import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ShowBackButtonDirective } from './features/directive/show-back-button.directive'; // Importa la directiva
import { EmailService } from './features/services/email.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ShowBackButtonDirective, // Declara la directiva
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    EmailService,
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({ 
      // Bastian Ampuero DATABASE
      // apiKey: "AIzaSyBwLmwNEci3IDWE3pVoMVxjo6JU-Dnnps4",
      // authDomain: "assistancemanager-70b10.firebaseapp.com",
      // projectId: "assistancemanager-70b10",
      // storageBucket: "assistancemanager-70b10.appspot.com",
      // messagingSenderId: "372561889746",
      // appId: "1:372561889746:web:f7c6374bfd04dcda94200b",
      // measurementId: "G-CKWTXG7FNG" })),

      // Sebastián Morales DATABASE
      apiKey: "AIzaSyChKIwFMO2YAeaLf34kseebRP2HTseOTRQ",
      authDomain: "assistancemanager-a9ef1.firebaseapp.com",
      projectId: "assistancemanager-a9ef1",
      storageBucket: "assistancemanager-a9ef1.appspot.com",
      messagingSenderId: "401648947203",
      appId: "1:401648947203:web:87626c39c28f1a10847e36",
      measurementId: "G-NJ1VQK5RFN" })),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
