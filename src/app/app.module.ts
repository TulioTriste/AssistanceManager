import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ShowBackButtonDirective } from './show-back-button.directive'; // Importa la directiva

const firebaseConfig = {
  apiKey: "AIzaSyBwLmwNEci3IDWE3pVoMVxjo6JU-Dnnps4",
  authDomain: "assistancemanager-70b10.firebaseapp.com",
  projectId: "assistancemanager-70b10",
  storageBucket: "assistancemanager-70b10.appspot.com",
  messagingSenderId: "372561889746",
  appId: "1:372561889746:web:f7c6374bfd04dcda94200b",
  measurementId: "G-CKWTXG7FNG"
};

@NgModule({
  declarations: [
    AppComponent,
    ShowBackButtonDirective // Declara la directiva
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
