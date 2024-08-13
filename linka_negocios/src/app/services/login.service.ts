import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiUrl = environment.apiUrl + '/admin/';

  constructor(private httpClient: HttpClient) { }

  autorizado = false;

  autorizar(response: any) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('email', response.email);
  }

  deslogar() {
    localStorage.clear();
  }

  statusLogin() {
    let token = localStorage.getItem('token');
    return this.httpClient.post(this.apiUrl + 'login/verificarlogin.php', { 'token': token });
  }

  logar(login: any) {
    console.log(login)
    return this.httpClient.post(this.apiUrl + 'login/logar.php', login);
  }

   sendResetPasswordLink(email: string) {
   console.log(`Ainda em processo ${email}`);
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