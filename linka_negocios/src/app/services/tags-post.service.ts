import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsPostService {
  private readonly apiUrl = environment.apiUrl + '/public/';

  constructor(private http: HttpClient) {}

  create(ids: any): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl + 'tags_postagem/create.php', ids);
  }

  read(id: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'tags_postagem/read.php?postagem_id=' + id);
  }
}
