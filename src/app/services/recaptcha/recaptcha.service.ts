import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {
  executeRecaptcha(action: string): Promise<string> {
    return new Promise((resolve: any) => {
      grecaptcha.ready(() => {
        grecaptcha
          .execute('6LezRUYqAAAAAO8_eWajdoIMOJPWKbREv9208PeC', { action })
          .then((token: string) => resolve(token));
      });
    });
  }
}
