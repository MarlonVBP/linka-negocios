import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../models/admin';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private apiUrl = 'http://linkanegocios/ApiLinkaNegocios/API_linka_negocios/admin/';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  create(data: any) {
    return this.http.post<any>(`${this.apiUrl}/sign-up/create.php`, data);
  }

}
