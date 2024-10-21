import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  return loginService.statusLogin().pipe(
    map((data: any) => {
      if (!(data.message == 'Acesso permitido.')) {
        snackBar.open(data.message, 'Fechar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
      if (data.success == '1') {
        return true;
      }
      router.navigate(['/']);
      return false;
    })
  );
};
