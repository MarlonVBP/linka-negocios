import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(255),
    ]),
  });

  constructor(
    private LoginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  hide: String = 'hide.png';
  passwordType: String = 'password';

  showPassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.hide = this.passwordType === 'password' ? 'hide.png' : 'show.png';
  }

  submitApplication() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const login = {
      email: this.loginForm.value.email,
      senha: this.loginForm.value.senha,
    };

    this.LoginService.logar(login).subscribe((data: any) => {
      console.log(data);
      if (data.success == '1') {
        this.snackBar.open('Sucesso ao logar.', 'Fechar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
        this.LoginService.autorizar(data.response);
        this.router.navigate(['/admin-home']);
        return;
      }
      this.snackBar.open(data.message + '.', 'Fechar', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    });
  }

  forgetPassword() {
    const email = this.loginForm.get('email')!.value;
    if (email) {
      this.LoginService.sendResetPasswordLink(email).subscribe(
        (response: any) => {
          if (response.message) {
            Swal.fire({
              text: `${response.message}`,
              imageUrl: 'https://a.imagem.app/3ubzQX.png',
              imageWidth: 80,
              imageHeight: 80,
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'custom-confirm-button',
              },
            });
            return;
          }

          Swal.fire('Erro', `${response.error}`, 'error');
        }
      );
    } else {
      this.loginForm.get('email')!.markAsTouched();
    }
  }
}
