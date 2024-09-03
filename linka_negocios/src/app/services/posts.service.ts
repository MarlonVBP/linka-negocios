import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Post } from '../models/post';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly apiUrl = environment.apiUrl + '/public/';
  private readonly apiUrlAdmin = environment.apiUrl + '/admin/';

  constructor(private http: HttpClient) { }

  createPost(postData: FormData): Observable<any> {
    const email = localStorage.getItem('email'); // Obtém o e-mail do localStorage

    // Adiciona o e-mail ao FormData
    postData.append('email', email || '');

    return this.http.post(this.apiUrl + 'posts/create.php', postData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  countPost() {
    return this.http.get<any>(this.apiUrl + 'posts/countPost.php');
  }

  getTitlePosts() {
    return this.http.get<any>(this.apiUrl + 'posts/getTitles.php');
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<{ success: boolean; data: any[] }>(this.apiUrl + 'posts/read.php').pipe(
      map(response => {
        if (response.success && Array.isArray(response.data)) {
          return response.data.map((post: any) => {
            const imgUrl = this.apiUrl + 'posts/' + (post.url_imagem || '');
            return {
              ...post,
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

  getPostsAdmin(): Observable<Post[]> {
    return this.http.get<{ success: boolean; data: any[] }>(this.apiUrlAdmin + 'post-admin/read.php').pipe(
      map(response => {
        if (response.success && Array.isArray(response.data)) {
          return response.data.map((post: any) => {
            const imgUrl = this.apiUrl + 'posts/' + (post.url_imagem || '');
            return {
              ...post,
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
    return this.http.get<Post>(this.apiUrl + 'posts/read.php' + '?id=' + postId).pipe(
      catchError(this.handleError)
    );
  }

  updatePost(postData: FormData): Observable<any> {
    return this.http.post(this.apiUrl + 'posts/update.php', postData, {
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

    return this.http.request('delete', this.apiUrl + 'posts/delete.php', {
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
