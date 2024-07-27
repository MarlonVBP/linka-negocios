import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private creatServicos = 'http://linkanegocios/ApiLinkaNegocios/API_linka_negocios/public/servicos/create.php';
  private readServicos = 'http://linkanegocios/ApiLinkaNegocios/API_linka_negocios/public/servicos/read.php';
  private updateServicos = 'http://linkanegocios/ApiLinkaNegocios/API_linka_negocios/public/servicos/update.php';
  private deleteServicos = 'http://linkanegocios/ApiLinkaNegocios/API_linka_negocios/public/servicos/delete.php';

  constructor(private http: HttpClient) {}

  getServicos(): Observable<any> {
    return this.http.get<any>(this.readServicos);
  }

  addServico(servico: Servico): Observable<Servico> {
    return this.http.post<Servico>(this.creatServicos, servico);
  }

  updateServico(servico: Servico): Observable<Servico> {
    return this.http.put<Servico>(this.updateServicos, servico);
  }

  deleteServico(id: number): Observable<any> {
    return this.http.delete<any>(`${this.deleteServicos}?id=${id}`);
  }
}
