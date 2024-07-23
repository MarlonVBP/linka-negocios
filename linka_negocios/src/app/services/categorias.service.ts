import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrlInsert = 'http://aula/API_linka_negocios/public/categorias/create.php';
  private apiUrlSelect = 'http://aula/API_linka_negocios/public/categorias/read.php';

  constructor(private http: HttpClient) {}

  createCategory(category: any): Observable<any> {
    return this.http.post<any>(this.apiUrlInsert, category);
  }

  selectCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlSelect);
  }
}

