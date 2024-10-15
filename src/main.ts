import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Configuración de Firebase (usa las credenciales que te proporcionaron)
export const firebaseConfig = {
  apiKey: "AIzaSyBwLmwNEci3IDWE3pVoMVxjo6JU-Dnnps4",
  authDomain: "assistancemanager-70b10.firebaseapp.com",
  projectId: "assistancemanager-70b10",
  storageBucket: "assistancemanager-70b10.appspot.com",
  messagingSenderId: "372561889746",
  appId: "1:372561889746:web:f7c6374bfd04dcda94200b",
  measurementId: "G-CKWTXG7FNG"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Analytics si lo necesitas
const analytics = getAnalytics(app);
