import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface Servico {
  id?: number;
  titulo: string;
  descricao: string;
  imagem: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicosService {
  private readonly apiUrl = environment.apiUrl + '/public/';

  constructor(private http: HttpClient) {}

  getServicos(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'servicos/read.php');
  }

  addServico(servico: Servico): Observable<Servico> {
    return this.http.post<Servico>(this.apiUrl + 'servicos/create.php', servico);
  }

  updateServico(servico: Servico): Observable<Servico> {
    return this.http.put<Servico>(this.apiUrl + 'servicos/update.php', servico);
  }

  deleteServico(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}servicos/delete.php?id=${id}`);
  }
}
