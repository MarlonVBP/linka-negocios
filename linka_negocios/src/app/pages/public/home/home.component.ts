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
import { MotivosHomeComponent } from '../../../components/public/motivos-home/motivos-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, SidebarClienteComponent, FooterComponent, SlidesShowComponent, FormsModule, ReactiveFormsModule, MotivosHomeComponent]
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  ngAfterViewInit(): void {
    this.showSlides();
  }

  title = 'Home';

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

  avaliacoes = [
    {
      avatarDetalhe: 'https://a.imagem.app/3qQwPW.png',
      conteudo: 'Comentário da pessoa Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      avatarUrl: 'https://a.imagem.app/3qQLht.png',
      nome: 'Nome da Pessoa'
    },
    {
      avatarDetalhe: 'https://a.imagem.app/3qQwPW.png',
      conteudo: 'Comentário da pessoa Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      avatarUrl: 'https://a.imagem.app/3qQLht.png',
      nome: 'Nome da Pessoa'
    },
    {
      avatarDetalhe: 'https://a.imagem.app/3qQwPW.png',
      conteudo: 'Comentário da pessoa Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      avatarUrl: 'https://a.imagem.app/3qQLht.png',
      nome: 'Nome da Pessoa'
    }
  ];

  currentSlideIndex: number = 0;
  slideInterval: any;

  contactForm: FormGroup;

  constructor(public dialog: MatDialog, private fb: FormBuilder, private contatoService: ContatoService, @Inject(PLATFORM_ID) private platformId: Object) {
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

  openModal(): void {
    this.dialog.open(ModalAvaliacoesComponent, {
      minWidth: '70vw',
      height: '70vh',
      panelClass: 'custom-dialog-container',
      data: this.avaliacoes
    });

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
