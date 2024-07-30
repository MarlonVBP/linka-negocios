import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../models/admin';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SignUpService {
    private apiUrl = 'http://linkanegocios/ApiLinkaNegocios/API_linka_negocios/admin/sign-up/';
    private apiUrlGetProfile = `${this.apiUrl}read.php`;
    private apiUrlUpdateProfile = `${this.apiUrl}update.php`;

    constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

    create(data: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}create.php`, data).pipe(
            catchError(this.handleError)
        );
    }

    getAdminProfile(): Observable<any> {
        const email = localStorage.getItem('email');
        if (!email) {
            throw new Error('E-mail não encontrado no localStorage');
        }
        return this.http.get<any>(`${this.apiUrlGetProfile}?email=${encodeURIComponent(email)}`).pipe(
            catchError(this.handleError)
        );
    }

    updateProfile(admin: Admin): Observable<any> {
      const email = localStorage.getItem('email');
      if (!email) {
          return throwError('Email não encontrado no localStorage');
      }
  
      // Converte Admin para o formato esperado pela API
      const body = {
          email: admin.email,
          nome_admin: admin.nome_admin,
          foto_perfil: admin.foto_perfil,
          cargo: admin.cargo,
          ultimo_login: new Date().toISOString() // Ajuste se necessário
      };
  
      return this.http.put(this.apiUrlUpdateProfile, body, {
          headers: new HttpHeaders({
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          })
      }).pipe(
          catchError(this.handleError)
      );
  }
  
    private handleError(error: any) {
        console.error('An error occurred:', error);
        this.snackBar.open('Ocorreu um erro, por favor tente novamente.', 'Fechar', {
            duration: 3000,
        });
        return throwError(() => new Error(error.message || 'Erro desconhecido'));
    }
}
