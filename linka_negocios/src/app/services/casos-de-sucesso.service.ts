import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CasosDeSucessoService {
  private readonly apiUrl = environment.apiUrl + '/public/';

  constructor(private http: HttpClient) {}

  create(casos_de_sucesso: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'casos_de_sucesso/create.php', casos_de_sucesso);
  }

  read(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'casos_de_sucesso/read.php');
  }

  update(casos_de_sucesso: any): Observable<any[]> {
    return this.http.put<any[]>(this.apiUrl + 'casos_de_sucesso/update.php', casos_de_sucesso);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}casos_de_sucesso/delete.php?id=${id}`);
  }
}
