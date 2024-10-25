import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private emailUrl = 'http://localhost:3000/send-email'; // Your backend URL

  constructor(private http: HttpClient) { }

  sendEmail(name: string, email: string, message: string): Observable<any> {
    const data = { email, name, message };
    return this.http.post(this.emailUrl, data);
  }
}
