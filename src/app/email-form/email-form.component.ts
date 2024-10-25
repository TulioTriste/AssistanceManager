import { Component, OnInit } from '@angular/core';
import { EmailService } from '../features/services/email.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss'],
})
export class EmailFormComponent  implements OnInit {

  public email: string = '';

  constructor(private emailService: EmailService) { }

  ngOnInit() {}

  onSubmit() {
    this.emailService.sendEmail(this.email).subscribe(
      response => {
        console.log('Email sent successfully!', response);
      },
      error => {
        console.error('Error sending email:', error);
      }
    );
  }
}
