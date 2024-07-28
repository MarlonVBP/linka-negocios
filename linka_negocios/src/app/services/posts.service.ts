import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrlInsert = 'http://linkanegocios/ApiLinkaNegocios/API_linka_negocios/public/posts/create.php';
  private apiUrlSelect = 'http://linkanegocios/ApiLinkaNegocios/API_linka_negocios/public/posts/read.php';
  private apiUrlUpdate = 'http://linkanegocios/ApiLinkaNegocios/API_linka_negocios/public/posts/update.php';
  private apiUrlDelete = 'http://linkanegocios/ApiLinkaNegocios/API_linka_negocios/public/posts/delete.php';
  private imageBaseUrl = 'http://linkanegocios/ApiLinkaNegocios/API_linka_negocios/public/posts/';

  constructor(private http: HttpClient) { }

  createPost(postData: FormData): Observable<any> {
    const email = localStorage.getItem('email'); // Obtém o e-mail do localStorage

    // Adiciona o e-mail ao FormData
    postData.append('email', email || '');

    return this.http.post(this.apiUrlInsert, postData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<{ success: boolean; data: any[] }>(this.apiUrlSelect).pipe(
      map(response => {
        if (response.success && Array.isArray(response.data)) {
          return response.data.map((post: any) => {
            const imgUrl = this.imageBaseUrl + (post.url_imagem || '');
            return {
              ...post,
              views: '95',
              comentarios: '15',
              data: this.formatDate(post.criado_em),
              imgUrl: imgUrl
            };
          });
        } else {
          return [];
        }
      }),
      catchError(this.handleError)
    );
  }

  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(this.apiUrlSelect + '?id=' + postId).pipe(
      catchError(this.handleError)
    );
  }

  updatePost(postData: FormData): Observable<any> {
    return this.http.post(this.apiUrlUpdate, postData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  deletePost(postId: number): Observable<any> {
    const email = localStorage.getItem('email');
    if (!email) {
        return throwError('Email não encontrado no localStorage');
    }

    const body = {
        id: postId,
        email: email
    };

    return this.http.request('delete', this.apiUrlDelete, {
        body: JSON.stringify(body),
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }).pipe(
        catchError(this.handleError)
    );
}


  

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    if (diffInMinutes < 60) {
      return `${diffInMinutes} mins atrás`;
    }
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours < 24) {
      return `${diffInHours} hrs atrás`;
    }
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return `${diffInDays} dias atrás`;
  }
}
