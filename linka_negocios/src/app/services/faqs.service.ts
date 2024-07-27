import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Faq } from '../models/faq';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {
  private apiUrl = 'http://linkanegocios/ApiLinkaNegocios/API_linka_negocios/public/';

  constructor(private http: HttpClient) { }

  create(pergunta: any) {
    console.log(pergunta);
    return this.http.post<Faq>(this.apiUrl + 'downloads/faqs/create.php', pergunta);
  }

  read(resposta?: boolean) {
    const respostaParam = resposta !== true ? '' : resposta;
    return this.http.get<Faq[]>(this.apiUrl + 'downloads/faqs/read.php?resposta=' + respostaParam);
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + 'downloads/faqs/delete.php?id=' + id);
  }
}
