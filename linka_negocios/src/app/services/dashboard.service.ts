import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://linkanegocios/ApiLinkaNegocios/API_linka_negocios/admin/dashboard/';

  constructor(private http: HttpClient) { }

  read() {
    return this.http.get(this.apiUrl + 'read.php');
  }
}
