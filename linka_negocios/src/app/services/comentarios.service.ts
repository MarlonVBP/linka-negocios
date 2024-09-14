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

  // Operações relacionadas a comentários de páginas
  create_pag(comentario: any) {
    console.log('Criando comentário de página:', comentario);
    return this.http.post<Comentario>(`${this.apiUrl}comentarios_paginas/create.php`, comentario);
  }

  read_pag(id?: number) {
    const url = id ? `${this.apiUrl}comentarios_paginas/read.php?id=${id}` : `${this.apiUrl}comentarios_paginas/read.php`;
    return this.http.get<Comentario[]>(url);
  }

  delete_pag(id: number) {
    return this.http.delete(`${this.apiUrl}comentarios_paginas/delete.php?id=${id}`);
  }

  mark_comments_as_read_pag(ids: number[]) {
    console.log('Marcando comentários de página como lidos:', ids);
    return this.http.post<any>(`${this.apiUrl}comentarios_paginas/update.php`, { ids }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Operações relacionadas a comentários de produtos
  create_prod(comentario: any) {
    console.log('Criando comentário de produto:', comentario);
    return this.http.post<Comentario>(`${this.apiUrl}comentarios_produtos/create.php`, comentario);
  }

  read_prod(id?: number) {
    const url = id ? `${this.apiUrl}comentarios_produtos/read.php?id=${id}` : `${this.apiUrl}comentarios_produtos/read.php`;
    return this.http.get<Comentario[]>(url);
  }

  delete_prod(id: number) {
    return this.http.delete(`${this.apiUrl}comentarios_produtos/delete.php?id=${id}`);
  }

  mark_comments_as_read_prod(ids: number[]) {
    console.log('Marcando comentários de produto como lidos:', ids);
    return this.http.post<any>(`${this.apiUrl}comentarios_produtos/update.php`, { ids }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Operações relacionadas a comentários de postagens
  create_post(comentario: any) {
    console.log('Criando comentário de postagem:', comentario);
    return this.http.post<Comentario>(`${this.apiUrl}comentarios_postagem/create.php`, comentario);
  }

  read_post(id?: number) {
    const url = id ? `${this.apiUrl}comentarios_postagem/read.php?id=${id}` : `${this.apiUrl}comentarios_postagem/read.php`;
    return this.http.get<Comentario[]>(url);
  }

  delete_post(id: number) {
    return this.http.delete(`${this.apiUrl}comentarios_postagem/delete.php?id=${id}`);
  }

  mark_comments_as_read_post(ids: number[]) {
    console.log('Marcando comentários de postagem como lidos:', ids);
    return this.http.post<any>(`${this.apiUrl}comentarios_postagem/update.php`, { ids }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
