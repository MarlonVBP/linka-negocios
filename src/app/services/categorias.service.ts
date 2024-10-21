import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private readonly apiUrl = environment.apiUrl + '/public/';

  constructor(private http: HttpClient) {}

  createCategory(category: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'categorias/create.php', category);
  }

  selectCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'categorias/read.php');
  }

  countCategorias(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl + 'categorias/countCategorias.php');
  }
}

