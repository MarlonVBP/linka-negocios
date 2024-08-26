import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface AvaliacaoHome {
  id?: number;
  nome: string;
  avaliacao: number;
  mensagem: string;
  foto_perfil: string;
}

@Injectable({
  providedIn: 'root'
})
export class avaliacaoHomeService {
  private readonly apiUrl = environment.apiUrl + '/public/';

  constructor(private http: HttpClient) {}

  getAvaliacaoes(): Observable<{ success: number; data: AvaliacaoHome[] }> {
    return this.http.get<{ success: number; data: AvaliacaoHome[] }>(this.apiUrl + 'avaliacao_home/read.php');
  }

  addAvalicao(avaliacao: AvaliacaoHome): Observable<AvaliacaoHome> {
    return this.http.post<AvaliacaoHome>(this.apiUrl + 'avaliacao_home/create.php', avaliacao);
  }
}
