import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private emailUrl = 'http://localhost:3000/send-email'; // Your backend URL

  constructor(private http: HttpClient) { }

  sendEmail(email: string, name: string, message: string): Observable<any> {
    const body = { name, email, message };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.emailUrl, body, { headers });
  }
}
