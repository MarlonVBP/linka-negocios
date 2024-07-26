import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comentario } from '../models/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private apiUrl = 'http://linkanegocios/ApiLinkaNegocios/API_linka_negocios/public/';

  constructor(private http: HttpClient) { }

  create_pag(comentario: any) {
    console.log(comentario);
    return this.http.post<Comentario>(this.apiUrl + 'comentarios_paginas/create.php', comentario);
  }

  read_pag(id: number) {
    return this.http.get<Comentario[]>(this.apiUrl + 'comentarios_paginas/read.php?id=' + id);
  }

  delete_pag(id: number) {
    return this.http.delete(this.apiUrl + 'comentarios_paginas/delete.php?id=' + id);
  }

  create_post(comentario: any) {
    console.log(comentario);
    return this.http.post<Comentario>(this.apiUrl + 'comentarios_postagem/create.php', comentario);
  }

  read_post(id: number) {
    return this.http.get<Comentario[]>(this.apiUrl + 'comentarios_postagem/read.php?id=' + id);
  }

  delete_post(id: number) {
    return this.http.delete(this.apiUrl + 'comentarios_post/delete.php?id=' + id);
  }
}
