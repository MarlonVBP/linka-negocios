import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  Inject,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { SlidesShowComponent } from '../../../components/public/slides-show/slides-show.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoService } from '../../../services/contato.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { avaliacaoHomeService } from '../../../services/avaliacao-home.service';
import { IconeWhatsappComponent } from '../../../components/public/icone-whatsapp/icone-whatsapp.component';
import { MotivosComponent } from '../../admin/motivos/motivos.component';
import { MotivosHomeComponent } from '../../../components/public/motivos-home/motivos-home.component';
import { ComentariosService } from '../../../services/comentarios.service';
import { CasosDeSucessoService } from '../../../services/casos-de-sucesso.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { EquipeLinkaNegociosService } from '../../../services/equipe-linka-negocios.service';
import Swal from 'sweetalert2';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { RecaptchaService } from '../../../services/recaptcha/recaptcha.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { ConsoleAlertService } from '../../../services/console-alert.service';

export interface AvaliacaoHome {
  id: number;
  nome: string;
  avaliacao: number;
  mensagem: string;
  foto_perfil: string;
  criado_em: string;
}

export interface CasoDeSucesso {
  id: number;
  titulo: string;
  mensagem: string;
  imagem: string;
  criado_em: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LezRUYqAAAAAO8_eWajdoIMOJPWKbREv9208PeC',
      } as RecaptchaSettings,
    },
  ],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate(
          '0.8s cubic-bezier(0.5, 0, 0.5, 1)',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '1s ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate(
          '1s ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
  imports: [
    CommonModule,
    SidebarClienteComponent,
    FooterComponent,
    SlidesShowComponent,
    FormsModule,
    ReactiveFormsModule,
    IconeWhatsappComponent,
    MotivosComponent,
    MotivosHomeComponent,
    RouterLink,
    RouterOutlet,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  pagina_id: number = 1;

  avaliacoes: AvaliacaoHome[] = [];
  casosSucesso: CasoDeSucesso[] = [];
  equipe: any[] = [];
  public isVisible: boolean[] = [];
  public isStoryVisible: boolean[] = [];

  @ViewChild('equipeSection', { static: true }) equipeSection!: ElementRef;
  @ViewChild('casosSucessoSection', { static: true })
  casosSucessoSection!: ElementRef;

  slides: any[] = [];

  currentSlideIndex: number = 0;
  slideInterval: any;

  clientNumber: string = '5515981267536';
  message: string = 'Olá, vim pelo seu site o LinkaNegocios e gostaria de...';
  whatsappLink: string = '';

  contactForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private contatoService: ContatoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private comentariosServ: ComentariosService,
    private avaliacaoService: avaliacaoHomeService,
    private route: Router,
    private casosDeSucesso: CasosDeSucessoService,
    private equipeLinkaNegocios: EquipeLinkaNegociosService,
    private _recaptchaService: RecaptchaService,
    private consoleAlert: ConsoleAlertService
  ) {
    this.contactForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      empresa: [''],
      area_atuacao: [''],
      mensagem: ['', Validators.required],
    });

    this.consoleAlert.alertFunction();

    this.whatsappLink = this.createWhatsappLink();
  }

  createWhatsappLink(): string {
    const encodedMessage = encodeURIComponent(this.message);
    return `https://wa.me/${this.clientNumber}?text=${encodedMessage}`;
  }

  ngAfterViewInit(): void {
    this.showSlides();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.equipe.forEach((_, i) => {
              setTimeout(() => {
                this.isVisible[i] = true;
              }, i * 300);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(this.equipeSection.nativeElement);

    const observerCasosdeSucesso = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.casosSucesso.forEach((_, i) => {
              setTimeout(() => {
                this.isStoryVisible[i] = true;
              }, i * 500);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observerCasosdeSucesso.observe(this.casosSucessoSection.nativeElement);
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  showSlides(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
    this.slideInterval = setTimeout(() => {
      this.changeSlide(this.currentSlideIndex);
    }, 3000);
  }

  changeSlide(n: number): void {
    this.currentSlideIndex =
      (this.currentSlideIndex + n + this.slides.length) % this.slides.length;
  }

  currentSlide(n: number): void {
    this.currentSlideIndex = n % this.slides.length;
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
          confirmButton: 'custom-confirm-button',
        },
      });
      return;
    }

    try {
      this.recaptchaToken = await this.gerarTokenReCaptcha();

      const formData = {
        nome: this.contactForm.value.nome,
        email: this.contactForm.value.email,
        telefone: this.contactForm.value.telefone,
        empresa: this.contactForm.value.empresa,
        area_atuacao: this.contactForm.value.area_atuacao,
        mensagem: this.contactForm.value.mensagem,
        recaptcha: this.recaptchaToken,
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
              confirmButton: 'custom-confirm-button',
            },
          });
          this.contactForm.reset();
        },
        (error) => {
          Swal.fire({
            title: 'Erro!',
            text: 'Erro ao enviar! Revise os campos preenchidos.',
            imageUrl: 'https://a.imagem.app/3ubYKQ.png',
            imageWidth: 80,
            imageHeight: 80,
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'custom-confirm-button',
            },
          });
        }
      );
    } catch (error) {
      Swal.fire({
        title: 'Erro!',
        text: 'Falha ao validar reCAPTCHA. Tente novamente.',
        imageUrl: 'https://a.imagem.app/3ubYKQ.png',
        imageWidth: 80,
        imageHeight: 80,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-confirm-button',
        },
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

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.addScrollEventListeners();
    }
    this.getAvaliacoes();
    this.getCasosSucesso();
    this.getEquipe();
  }

  getAvaliacoes(): void {
    this.avaliacaoService.getAvaliacaoes().subscribe(
      (response: any) => {
        if (response.success) {
          this.avaliacoes = response.data;
        } else {
          console.error('Nenhum comentário encontrado.');
        }
      },
      (error) => {
        // console.error('Erro ao listar comentários:', error);
      }
    );
  }

  getCasosSucesso(): void {
    this.casosDeSucesso.read().subscribe(
      (response: any) => {
        this.casosSucesso = response.casos_sucesso;
        this.isStoryVisible = new Array(this.casosSucesso.length).fill(false);
      },
      (error) => {
        // console.error('Erro ao carregar casos de sucesso', error);
      }
    );
  }

  getEquipe(): void {
    this.equipeLinkaNegocios.read().subscribe(
      (response: any) => {
        this.equipe = response.equipe_linka_negocios;
        this.isVisible = new Array(this.equipe.length).fill(false);
      },
      (error) => {
        // console.error('Erro ao carregar membros', error);
      }
    );
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  avaliacao: { avaliacao: number } = { avaliacao: 3 };
  totalStars: number = 5;

  get starsArray(): number[] {
    return Array.from({ length: this.totalStars }, (_, i) => i + 1);
  }

  addScrollEventListeners(): void {
    const buttons = document.querySelectorAll('.scroll-button');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const targetSelector = (button as HTMLElement).getAttribute(
          'data-target'
        );
        if (targetSelector) {
          const targetElement = document.querySelector(targetSelector);
          if (targetElement) {
            this.smoothScrollTo(targetElement);
          }
        }
      });
    });
  }

  smoothScrollTo(element: Element): void {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t: number, b: number, c: number, d: number) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }
}
