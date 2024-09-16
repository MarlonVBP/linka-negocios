import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {
  executeRecaptcha(action: string): Promise<string> {
    return new Promise((resolve) => {
      grecaptcha.ready(() => {
        grecaptcha
          .execute('6LeUL0YqAAAAAL0eiL3w4pWIlcT5EIjIdgV2IddK', { action })
          .then((token: string) => resolve(token));
      });
    });
  }
}
