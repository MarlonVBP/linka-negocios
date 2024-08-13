import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly apiUrl = environment.apiUrl + '/admin/';

  constructor(private http: HttpClient) { }

  read() {
    return this.http.get(this.apiUrl + 'dashboard/read.php');
  }
}
