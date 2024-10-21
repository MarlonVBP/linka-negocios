import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipeLinkaNegociosService {
  private readonly apiUrl = environment.apiUrl + '/public/';

  constructor(private http: HttpClient) {}

  create(equipe_linka_negocios: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'equipe_linka_negocios/create.php', equipe_linka_negocios);
  }

  read(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'equipe_linka_negocios/read.php');
  }

  update(equipe_linka_negocios: any): Observable<any[]> {
    return this.http.put<any[]>(this.apiUrl + 'equipe_linka_negocios/update.php', equipe_linka_negocios);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}equipe_linka_negocios/delete.php?id=${id}`);
  }
}
