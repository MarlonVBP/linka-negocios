import { Component } from '@angular/core';
import { SignUpService } from '../../../services/sign-up.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-sign-up',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'] // Corrigido o erro de digitação
})
export class SignUpComponent {
  signUpForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
    confirmaSenha: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)])
  });

  constructor(private signUpService: SignUpService, private router: Router, private snackBar: MatSnackBar) {
    this.signUpForm.get('confirmaSenha')?.valueChanges.subscribe(value => {
      this.passwordMatchValidator();
    });
    this.signUpForm.get('senha')?.valueChanges.subscribe(value => {
      this.passwordMatchValidator();
    });
  } // Corrigido o erro de digitação

  hide: string = 'hide.png';
  passwordType: string = 'password';

  togglePassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.hide = this.passwordType === 'password' ? 'hide.png' : 'show.png';
  }

  mismatch: boolean = false;

  passwordMatchValidator() {
    const senhaInput = document.getElementById('senha') as HTMLInputElement;
    const senha = senhaInput ? senhaInput.value : null;
    const confirmaSenhaInput = document.getElementById('confirma-senha') as HTMLInputElement;
    const confirmaSenha = confirmaSenhaInput ? confirmaSenhaInput.value : null;
    this.mismatch = senha === confirmaSenha ? false : true;
  }

  submitApplication() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    const signUp = {
      nome_admin: this.signUpForm.value.nome,
      email: this.signUpForm.value.email,
      senha: this.signUpForm.value.senha,
    };

    this.signUpService.create(signUp).subscribe({
      next: (response) => {
        this.snackBar.open('Cadastro realizado com sucesso!', 'Fechar', {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        })
        this.router.navigate(['/login']);
      },
      error: (error) => {
        let errorMessage = 'Erro desconhecido!';

        if (error.status === 400) {
          errorMessage = 'Dados incompletos ou inválidos.';
        } else if (error.status === 409) {
          errorMessage = 'O e-mail já está cadastrado.';
        } else if (error.status === 500) {
          errorMessage = 'Erro no servidor.';
        }

        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 5000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        })
      }
    });
  }
}
