import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import Swal from 'sweetalert2';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-resetar-senha',
    imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(20px)' }),
                animate('0.5s ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
        ]),
    ],
    templateUrl: './resetar-senha.component.html',
    styleUrls: ['./resetar-senha.component.scss']
})
export class ResetarSenhaComponent {
  message: string = '';
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.token = params['token'];
    });
    console.log(this.token, ' - Token lido da URL');
  }

  resetPasswordForm = new FormGroup({
    senha: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(255),
    ]),
  });

  hide: string = 'hide.png';
  passwordType: string = 'password';

  togglePassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.hide = this.passwordType === 'password' ? 'hide.png' : 'show.png';
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    const newPassword = this.resetPasswordForm.value.senha;
    console.log(newPassword, ' - Nova Senha');

    this.loginService
      .resetarSenha(this.token, newPassword)
      .subscribe((response: any) => {
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

          this.router.navigate(['/login']);
          return;
        }
        Swal.fire('Erro', `${response.error}`, 'error');
      });
  }

  getErrorMessage(controlName: string): string {
    const control = this.resetPasswordForm.get(controlName);
    if (control && control.invalid && (control.dirty || control.touched)) {
      if (control.errors?.['required']) {
        return 'Campo obrigatório';
      }
      if (control.errors?.['email']) {
        return 'Email inválido';
      }
      if (control.errors?.['minlength']) {
        return `O campo deve ter no mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      }
      if (control.errors?.['maxlength']) {
        return `O campo deve ter no máximo ${control.errors['maxlength'].requiredLength} caracteres`;
      }
    }
    return '';
  }
}
