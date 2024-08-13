import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface Contato {
  id?: number;
  nome: string;
  email: string;
  telefone: number;
  empresa: string;
  area_atuacao : string;
  mensagem: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private readonly apiUrl = environment.apiUrl + '/public/';

  constructor(private http: HttpClient) {}

  getContatos(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'sobre-nos/read.php');
  }

  addContato(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.apiUrl + 'sobre-nos/create.php', contato);
  }
}
