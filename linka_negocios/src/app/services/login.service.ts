import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'temos que criar uma';

  constructor(private http: HttpClient) { }
  submitApplication(email: string, senha: string) {
    console.log(
      `Homes application received:: email: ${email}, senha: ${senha}.`,
    );
  }

  sendResetPasswordLink(email: string) {
    console.log(`Que pena :D, ${email} kkkkkkk`);
  }

}

// submitApplication(email: string, senha: string): Observable<any> {
//   // Implemente a lógica de login aqui
//   return this.http.post(`${this.apiUrl}/login`, { email, senha });
// }

// sendResetPasswordLink(email: string): Observable<any> {
//   // Implemente a lógica para enviar o link de redefinição de senha
//   return this.http.post(`${this.apiUrl}/send-reset-password-link`, { email });
// }