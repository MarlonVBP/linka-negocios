import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comentario } from '../models/comentario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private readonly apiUrl = environment.apiUrl + '/public/';

  constructor(private http: HttpClient) { }

  create_pag(comentario: any) {
    console.log(comentario);
    return this.http.post<Comentario>(this.apiUrl + 'comentarios_paginas/create.php', comentario);
  }

  read_pag(id?: number) {
    return this.http.get<Comentario[]>(this.apiUrl + 'comentarios_paginas/read.php?id=' + id);
  }

  delete_pag(id: number) {
    return this.http.delete(this.apiUrl + 'comentarios_paginas/delete.php?id=' + id);
  }

  mark_comments_as_read_pag(ids: number[]) {
    console.log(ids);
    return this.http.post<any>(this.apiUrl + 'comentarios_paginas/update.php', ids);
  }
  
  create_prod(comentario: any) {
    console.log(comentario);
    return this.http.post<Comentario>(this.apiUrl + 'comentarios_produtos/create.php', comentario);
  }

  read_prod(id?: number) {
    return this.http.get<Comentario[]>(this.apiUrl + 'comentarios_produtos/read.php?id=' + id);
  }

  delete_prod(id: number) {
    return this.http.delete(this.apiUrl + 'comentarios_produtos/delete.php?id=' + id);
  }

  mark_comments_as_read_prod(ids: number[]) {
    console.log(ids);
    return this.http.post<any>(this.apiUrl + 'comentarios_produtos/update.php', ids);
  }

  create_post(comentario: any) {
    console.log(comentario);
    return this.http.post<Comentario>(this.apiUrl + 'comentarios_postagem/create.php', comentario);
  }

  read_post(id?: number) {
    return this.http.get<Comentario[]>(this.apiUrl + 'comentarios_postagem/read.php?id=' + id);
  }

  delete_post(id: number) {
    return this.http.delete(this.apiUrl + 'comentarios_postagem/delete.php?id=' + id);
  }

  mark_comments_as_read_post(ids: number[]) {
    console.log(ids);
    return this.http.post<any>(this.apiUrl + 'comentarios_postagem/update.php', ids);
  }
}
