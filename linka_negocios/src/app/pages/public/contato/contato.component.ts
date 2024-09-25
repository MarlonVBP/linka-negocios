import { Component } from '@angular/core';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ContatoService } from '../../../services/contato.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IconeWhatsappComponent } from '../../../components/public/icone-whatsapp/icone-whatsapp.component';
import Swal from 'sweetalert2';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaService } from '../../../services/recaptcha/recaptcha.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { ConsoleAlertService } from '../../../services/console-alert.service';

@Component({
  selector: 'app-contato',
  standalone: true,
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LezRUYqAAAAAO8_eWajdoIMOJPWKbREv9208PeC' } as RecaptchaSettings,
    },
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }), // Começa invisível e levemente deslocado para baixo
        animate('0.5s ease-in', style({ opacity: 1, transform: 'translateY(0)' })) // Anima para ficar visível e retornar à posição original
      ])
    ])
  ],
  imports: [SidebarClienteComponent, FooterComponent, CommonModule, ReactiveFormsModule, IconeWhatsappComponent, RecaptchaModule, RecaptchaFormsModule],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent {
  showModal = false;
  contactForm: FormGroup;

  constructor(private contatoService: ContatoService, private fb: FormBuilder, private _recaptchaService: RecaptchaService, private alerMensage: ConsoleAlertService) {
    this.contactForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      empresa: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      area_atuacao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      mensagem: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(300)]]
    });

    
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  async submitForm(): Promise<void> {
    console.log(this.contactForm.value);

    if (this.contactForm.invalid) {
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

      const contact = {
        nome: this.contactForm.value.nome,
        email: this.contactForm.value.email,
        telefone: this.contactForm.value.telefone,
        empresa: this.contactForm.value.empresa,
        area_atuacao: this.contactForm.value.area_atuacao,
        mensagem: this.contactForm.value.mensagem,
        recaptcha: this.recaptchaToken
      };

      this.contatoService.addContato(contact).subscribe(
        response => {
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

          this.closeModal();
          this.contactForm.reset();
        },
        error => {
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


  private recaptchaToken: string = '';

  async gerarTokenReCaptcha(): Promise<string> {
    try {
      const token = await this._recaptchaService.executeRecaptcha('homepage');
      return token;
    } catch (error) {
      return '';
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
}
