import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  submitApplication(email: string, senha: string) {
    console.log(
      `Homes application received:: email: ${email}, senha: ${senha}.`,
    );
  }
}
