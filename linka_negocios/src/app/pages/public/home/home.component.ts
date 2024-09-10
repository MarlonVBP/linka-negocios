import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, Inject } from '@angular/core';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { SlidesShowComponent } from '../../../components/public/slides-show/slides-show.component';
import { ModalAvaliacoesComponent } from '../../../components/public/modal-avaliacoes/modal-avaliacoes.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoService } from '../../../services/contato.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { avaliacaoHomeService } from '../../../services/avaliacao-home.service';
import { IconeWhatsappComponent } from '../../../components/public/icone-whatsapp/icone-whatsapp.component';
import { MotivosComponent } from '../../admin/motivos/motivos.component';
import { MotivosHomeComponent } from "../../../components/public/motivos-home/motivos-home.component";
import { ComentariosService } from '../../../services/comentarios.service';
import { NgModule } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

export interface AvaliacaoHome {
  id: number;
  nome: string;
  avaliacao: number;
  mensagem: string;
  foto_perfil: string;
  criado_em: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, SidebarClienteComponent, FooterComponent, SlidesShowComponent, FormsModule, ReactiveFormsModule, IconeWhatsappComponent, MotivosComponent, MotivosHomeComponent, RouterLink, RouterOutlet]
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  ngAfterViewInit(): void {
    this.showSlides();
  }

  pagina_id: number = 1;

  title = 'Home';
  avaliacoes: AvaliacaoHome[] = []; 

  slides: any[] = [
    {
      title: 'Slide 1 Title',
      description: 'Slide 1 Description',
      image: 'https://a.imagem.app/3qu6ct.png'
    },
    {
      title: 'Slide 2 Title',
      description: 'Slide 2 Description',
      image: 'https://a.imagem.app/3qQJoG.png'
    },
    {
      title: 'Slide 3 Title',
      description: 'Slide 3 Description',
      image: 'https://a.imagem.app/3qu6ct.png'
    }
  ];

  currentSlideIndex: number = 0;
  slideInterval: any;

  contactForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder, private contatoService: ContatoService, @Inject(PLATFORM_ID) private platformId: Object, private comentariosServ: ComentariosService, private avaliacaoService: avaliacaoHomeService, private route: Router) {
    this.contactForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      empresa: [''],
      area_atuacao: [''],
      mensagem: ['', Validators.required]
    });
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
    this.currentSlideIndex = (this.currentSlideIndex + n + this.slides.length) % this.slides.length;
  }

  currentSlide(n: number): void {
    this.currentSlideIndex = n % this.slides.length;
  }

  submitForm() {
    if (this.contactForm.valid) {
      this.contatoService.addContato(this.contactForm.value).subscribe(
        response => {
          alert('Formulário enviado com sucesso!');
          this.contactForm.reset();
        },
        error => {
          console.error('Erro ao enviar formulário:', error);
          alert('Houve um erro ao enviar o formulário. Por favor, tente novamente.');
        }
      );
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
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
        console.error('Erro ao listar comentários:', error);
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
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const targetSelector = (button as HTMLElement).getAttribute('data-target');
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
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }
}
