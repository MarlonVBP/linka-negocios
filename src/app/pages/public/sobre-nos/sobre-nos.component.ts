import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { isPlatformBrowser } from '@angular/common';
import { IconeWhatsappComponent } from '../../../components/public/icone-whatsapp/icone-whatsapp.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { avaliacaoHomeService } from '../../../services/avaliacao-home.service';
import Swal from 'sweetalert2';
import { trigger, transition, style, animate } from '@angular/animations';
import { ConsoleAlertService } from '../../../services/console-alert.service';

@Component({
  selector: 'app-sobre-nos',
  standalone: true,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '0.5s ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
  imports: [
    SidebarClienteComponent,
    FooterComponent,
    IconeWhatsappComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './sobre-nos.component.html',
  styleUrls: ['./sobre-nos.component.scss'],
})
export class SobreNosComponent implements OnInit {
  private readonly fotoPerfilOptions = [
    'https://a.imagem.app/3C1Iiv.png',
    'https://a.imagem.app/3C1E3S.png',
    'https://a.imagem.app/3C1QIT.png',
  ];

  feedback = {
    nome: '',
    avaliacao: 0,
    mensagem: '',
    foto_perfil: '',
  };

  stars = Array(5).fill(0);
  rating = 0;
  hoverState = 0;
  formSubmitted = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private avaliacaoService: avaliacaoHomeService,
    private alerMensage: ConsoleAlertService
  ) {
    this.alerMensage.alertFunction();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.addScrollEventListeners();
    }
  }

  addScrollEventListeners(): void {
    const buttons = document.querySelectorAll('.scroll-button');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const targetId = (button as HTMLElement).getAttribute('data-target');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: (targetElement as HTMLElement).offsetTop,
              behavior: 'smooth',
            });
          }
        }
      });
    });
  }

  rate(star: number) {
    this.rating = star;
    this.feedback.avaliacao = star;
  }

  hover(star: number) {
    this.hoverState = star;
  }

  reset() {
    this.hoverState = 0;
  }

  selectRandomFotoPerfil(): string {
    const randomIndex = Math.floor(
      Math.random() * this.fotoPerfilOptions.length
    );
    return this.fotoPerfilOptions[randomIndex];
  }

  submitFeedback() {
    this.formSubmitted = true;

    if (this.feedback.nome && this.feedback.mensagem && this.rating > 0) {
      this.feedback.foto_perfil = this.selectRandomFotoPerfil();
      this.feedback.avaliacao = this.rating;

      this.avaliacaoService.addAvalicao(this.feedback).subscribe({
        next: (response) => {
          console.log('Feedback enviado:', response);

          Swal.fire({
            text: 'Seu feedback foi enviado com sucesso.',
            imageUrl: 'https://a.imagem.app/3ubzQX.png',
            imageWidth: 80,
            imageHeight: 80,
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'custom-confirm-button',
            },
          });

          this.resetForm();
        },
        error: (err) => {
          console.error('Erro ao enviar feedback:', err);
          Swal.fire({
            title: 'Erro!',
            text: 'Ocorreu um problema ao enviar seu feedback. Tente novamente.',
            imageUrl: 'https://a.imagem.app/3ubYKQ.png',
            imageWidth: 80,
            imageHeight: 80,
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'custom-confirm-button',
            },
          });
        },
      });
    }
  }

  resetForm() {
    this.feedback = { nome: '', mensagem: '', avaliacao: 0, foto_perfil: '' };
    this.rating = 0;
    this.hoverState = 0;
    this.formSubmitted = false;
  }
}
