import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private apiUrl = ''; 

  constructor(private http: HttpClient) { }

  submitApplication(email: string, nome: string, conteudo: string): Observable<void> {
    console.log(
      `Insights application received:: email: ${email}, nome: ${nome}, conteudo: ${conteudo}.`
    );
    return of(undefined);
  }
}
