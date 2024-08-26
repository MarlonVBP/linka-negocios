import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private readonly apiUrl = environment.apiUrl + '/public/';

  constructor(private http: HttpClient) {}

  createTags(tag: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'tags/create.php', tag);
  }

  selectTags(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'tags/read.php');
  }

}
