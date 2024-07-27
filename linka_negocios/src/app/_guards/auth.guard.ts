import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  return loginService.statusLogin().pipe(
    map((data: any) => {
      console.log(data);
      if (data.success == '1') {
        return true;
      }
      router.navigate(['/login']);
      return false;
    })
  );
};
