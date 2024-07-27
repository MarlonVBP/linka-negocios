import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private creatContato = 'http://linkanegocios/ApiLinkaNegocios/API_linka_negocios/public/sobre-nos/create.php';
  private readContato = 'http://linkanegocios/ApiLinkaNegocios/API_linka_negocios/public/sobre-nos/read.php';

  constructor(private http: HttpClient) {}

  getContatos(): Observable<any> {
    return this.http.get<any>(this.readContato);
  }

  addContato(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.creatContato, contato);
  }
}
