import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private emailUrl = 'http://localhost:3000/send-email'; // Your backend URL

  constructor(private http: HttpClient) { }

  sendEmail(email: string): Observable<any> {
    const data = { email };
    return this.http.post(this.emailUrl, data);
  }
}
