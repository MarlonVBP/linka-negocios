import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RecaptchaService } from '../../../services/recaptcha/recaptcha.service';
import { ContatoService } from '../../../services/contato.service';
import { CommonModule } from '@angular/common';
import { RecaptchaFormsModule } from 'ng-recaptcha';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RecaptchaFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contatoService: ContatoService,
    private _recaptchaService: RecaptchaService,
    public dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contactForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      empresa: [''],
      area_atuacao: [''],
      mensagem: ['', Validators.required]
    });
  }

  private recaptchaToken: string = '';

  async gerarTokenReCaptcha(): Promise<string> {
    try {
      const token = await this._recaptchaService.executeRecaptcha('homepage');
      return token;
    } catch (error) {
      return '';
    }
  }

  async submitForm(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      Swal.fire({
        text: 'Todos os campos são obrigatórios.',
        imageUrl: 'https://a.imagem.app/3ubYKQ.png',
        imageWidth: 80,
        imageHeight: 80,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-confirm-button'
        }
      });
      return;
    }

    try {
      // Aguarda o token do reCAPTCHA
      this.recaptchaToken = await this.gerarTokenReCaptcha();

      const formData = {
        nome: this.contactForm.value.nome,
        email: this.contactForm.value.email,
        telefone: this.contactForm.value.telefone,
        empresa: this.contactForm.value.empresa,
        area_atuacao: this.contactForm.value.area_atuacao,
        mensagem: this.contactForm.value.mensagem,
        recaptcha: this.recaptchaToken
      };

      this.contatoService.addContato(formData).subscribe(
        (response) => {
          Swal.fire({
            text: 'Obrigado pelo contato! Responderemos em breve.',
            imageUrl: 'https://a.imagem.app/3ubzQX.png',
            imageWidth: 80,
            imageHeight: 80,
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'custom-confirm-button'
            }
          });
          this.contactForm.reset();
        },
        (error) => {
          console.error('Erro ao enviar formulário:', error);
          Swal.fire({
            title: 'Erro!',
            text: 'Erro ao enviar! Revise os campos preenchidos.',
            imageUrl: 'https://a.imagem.app/3ubYKQ.png',
            imageWidth: 80,
            imageHeight: 80,
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'custom-confirm-button'
            }
          });
        }
      );
    } catch (error) {
      console.error('Erro ao gerar token reCAPTCHA:', error);
      Swal.fire({
        title: 'Erro!',
        text: 'Falha ao validar reCAPTCHA. Tente novamente.',
        imageUrl: 'https://a.imagem.app/3ubYKQ.png',
        imageWidth: 80,
        imageHeight: 80,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-confirm-button'
        }
      });
    }
  }

  applyPhoneMask(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 5) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else {
      value = value.replace(/^(\d*)/, '($1');
    }
    input.value = value;
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
