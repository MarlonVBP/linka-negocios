import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private LoginService: LoginService, private router: Router) { }

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

    this.LoginService.submitApplication(
      this.loginForm.value.email ?? '',
      this.loginForm.value.senha ?? '',
    );

    this.router.navigate(['/creat-post']);
  }

  forgetPassword() {
    const email = this.loginForm.get('email')!.value;
    if (email){
      this.LoginService.sendResetPasswordLink(email);
      // .subscribe(
      //   response => {
      //     console.log('link enviado com sucesso', response);
      //   },
      //   error => {
      //     console.log('Erro ao enviar link', error);
      //   }
      // );
    } else {
      this.loginForm.get('email')!.markAsTouched();
    }
  }

}

