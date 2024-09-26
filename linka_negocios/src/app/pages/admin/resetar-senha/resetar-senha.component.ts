import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import Swal from 'sweetalert2';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-resetar-senha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './resetar-senha.component.html',
  styleUrl: './resetar-senha.component.scss',
})
export class ResetarSenhaComponent {
  newPassword: string = '';
  message: string = '';
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private loginServie: LoginService
  ) {
    this.token = this.route.snapshot.queryParams['token'];
  }

  onSubmit() {
    this.loginServie
      .resetarSenha(this.token, this.newPassword)
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
          return;
        }
        Swal.fire('Erro', `${response.error}`, 'error');
      });
  }
}
