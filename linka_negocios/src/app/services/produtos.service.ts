import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produtos';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private readonly apiUrl = environment.apiUrl + '/public/';


  constructor(private http: HttpClient) { }

  create(produto: any) {
    console.log(produto);
    return this.http.post<Produto>(this.apiUrl + 'downloads/create.php', produto);
  }

  read(produto?: boolean) {
    const respostaParam = produto !== true ? '' : produto;
    return this.http.get<Produto[]>(this.apiUrl + 'downloads/read.php');
  }

  getProdutoById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}downloads/read.php?id=${id}`);
  }

  uptadeProduto(servico: Produto): Observable<Produto> {
    return this.http.put<Produto>(this.apiUrl + 'downloads/update.php', servico);
  }

  deleteProduto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}downloads/delete.php?id=${id}`);
  }
}
