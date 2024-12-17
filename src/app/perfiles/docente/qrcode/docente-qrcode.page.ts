import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/features/services/user.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { interval, Subscription } from 'rxjs';
import { EmailService } from 'src/app/features/services/email.service';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Asistencia } from 'src/app/perfiles/alumno/scan-qr/scan-qr.page';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-docente-qrcode',
  templateUrl: './docente-qrcode.page.html',
  styleUrls: ['./docente-qrcode.page.scss'],
})
export class DocenteQrcodePage implements OnInit {

  countdown: number = 90; // Tiempo en segundos
  private timerSubscription: Subscription | undefined;
  timeMessage: string = '';

  public userData: User | undefined;
  qrData: string = '';

  message = '';

  constructor(private firestore: Firestore,
              private toastController: ToastController,
              private emailService: EmailService,
              private navCtrl: NavController) {
    this.userData = history.state as User;
  }

  async ngOnInit() {
    const fecha = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

    const assisRef = collection(this.firestore, 'asistencia'); // Referencia a la colección

    const doc = await addDoc(assisRef, {
      docente: this.userData?.name + ' ' + this.userData?.surname,
      fecha: fecha,
      asignatura: 'Programación Movil',
      available: true,
      presentes: [],
    });

    this.qrData = doc.id;

    this.startTimer();
  }

  startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.formatTime(this.countdown).then((message) => {
        this.timeMessage = message;
      });

      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.timerSubscription?.unsubscribe();
        this.timeMessage = 'Finalizado';

        this.onFinish();
      }
    });
  }

  async onFinish1() {
    //const email = "seb.moralesf@duocuc.cl";
    const email = this.userData?.email;
    const subject = "Asistencia registrada!";
    let message = '';

    const docRef = doc(this.firestore, 'asistencia', this.qrData);
    try {
      const querySnapshot = await getDoc(docRef);
      if (querySnapshot.exists()) {
        let data = querySnapshot.data() as Asistencia;

        // Esto es para que si alguien le saca foto al qr, al escanearlo no les permita registrarse
        updateDoc(docRef, {
          available: false
        });

        message = "Ésta es la información de la asistencía registrada: \n\n" +
                    "Docente: " + data.docente + "\n" +
                    "Fecha: " + data.fecha + "\n" +
                    "Asignatura: " + data.asignatura + "\n" +
                    "ID de asistencia: " + this.qrData + "\n" +
                    "Alumnos Presentes:\n" +
                    data.presentes.join(', ') + "\n\n" +
                    "Gracias por usar nuestra aplicación!"
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting documents: ', error);
    }

    const body = { subject, email, message };

    this.emailService.sendEmail(body).subscribe();

    this.message = 'Asistencia registrada!, redirigiendo a tu perfil...';

    interval(2000).subscribe(() => {
      this.navCtrl.navigateForward('/docente-perfil');
    });
  }

  async formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const parts: string[] = [];

    if (hours > 0) {
        parts.push(`${hours} hora${hours > 1 ? 's' : ''}`);
    }
    if (minutes > 0) {
        parts.push(`${minutes} minuto${minutes > 1 ? 's' : ''}`);
    }
    if (remainingSeconds > 0) {
        parts.push(`${remainingSeconds} segundo${remainingSeconds > 1 ? 's' : ''}`);
    }

    return parts.join(' ');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      
      duration: 2000, // Duración en milisegundos
      position: 'top', // Posición del toast (puede ser 'top', 'bottom', 'middle')
      color: 'success' // Puedes cambiar el color según tus necesidades
    });
    await toast.present();
  }
  async onFinish() {
    // ... tu código existente ...

    // this.message = 'Asistencia registrada!, redirigiendo a tu perfil...';

    // Mostrar el toast
    await this.presentToast('Asistencia registrada, redirigiendo a tu perfil...');

    interval(2000).subscribe(() => {
      this.navCtrl.navigateForward('/docente-perfil');
    });
  }
  
}
