import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface Motivos_Escolher_Empresa {
  id?: number;
  titulo: string;
  descricao: string;
  imagem: string;
}

@Injectable({
  providedIn: 'root'
})
export class MotivosEscolherEmpresaService {
  private readonly apiUrl = environment.apiUrl + '/public/';

  constructor(private http: HttpClient) {}

  getMotivos(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'motivos_escolher_empresa/read.php');
  }

  addMotivo(motivo: Motivos_Escolher_Empresa): Observable<Motivos_Escolher_Empresa> {
    return this.http.post<Motivos_Escolher_Empresa>(this.apiUrl + 'motivos_escolher_empresa/create.php', motivo);
  }

  updateMotivo(motivo: Motivos_Escolher_Empresa): Observable<Motivos_Escolher_Empresa> {
    return this.http.put<Motivos_Escolher_Empresa>(this.apiUrl + 'motivos_escolher_empresa/update.php', motivo);
  }

  deleteMotivo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}motivos_escolher_empresa/delete.php?id=${id}`);
  }
}
