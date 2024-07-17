import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private apiUrl = 'temos que criar uma';

  constructor(private http: HttpClient) { }
  submitApplication(email: string, nome: string, conteudo: string) {
    console.log(
      `Insights application received:: email: ${email}, nome: ${nome}, conteudo: ${conteudo}.`,
    );
  }
}
