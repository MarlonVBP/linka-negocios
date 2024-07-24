import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comentario } from '../models/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private apiUrl = 'http://linkanegocios/ApiLinkaNegocios/API_linka_negocios/public/';

  constructor(private http: HttpClient) { }

  create(comentario: any) {
    console.log(comentario);
    return this.http.post<Comentario>(this.apiUrl + 'comentarios_paginas/create.php', comentario);
  }

  read() {
    return this.http.get<Comentario[]>(this.apiUrl + 'comentarios_paginas/read.php');
  }
}
