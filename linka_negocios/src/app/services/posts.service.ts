import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrlInsert = 'http://aula/API_linka_negocios/public/posts/create.php';
  private apiUrlSelect = 'http://aula/API_linka_negocios/public/posts/read.php';
  private apiUrlUpdate = 'http://aula/API_linka_negocios/public/categorias/update.php';
  private apiUrlDelete = 'http://aula/API_linka_negocios/public/categorias/delete.php';

  constructor(private http: HttpClient) { }

  createPost(postData: FormData): Observable<any> {
    return this.http.post(this.apiUrlInsert, postData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlSelect);
  }

  // updatePost(id: number, data: any): Observable<any> {
  //   return this.http.put(`${this.apiUrlUpdate}?id=${id}`, data);
  // }

  // deletePost(id: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrlDelete}?id=${id}`);
}
