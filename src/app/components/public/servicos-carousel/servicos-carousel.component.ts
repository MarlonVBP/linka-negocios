import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Card } from '../../../models/card';
import { ServicosService } from '../../../services/servicos.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { MatDialog } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-servicos-carousel',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }), // Começa invisível e levemente deslocado para baixo
        animate(
          '0.5s ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ), // Anima para ficar visível e retornar à posição original
      ]),
    ]),
  ],
  templateUrl: './servicos-carousel.component.html',
  styleUrls: ['./servicos-carousel.component.scss'],
})
export class ServicosCarouselComponent
  implements AfterViewInit, OnDestroy, OnInit
{
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  items: any[] = [];
  currentIndex = 0;
  lastIndex = 0;
  containerWidth = 0;
  intervalId: any;
  cards: Card[] = [];
  spinner: boolean = false;

  private isDragging = false;
  private startX = 0;
  private deltaX = 0;
  draggingMouse = false;

  ngOnInit(): void {
    this.loadServicos();
  }

  loadServicos() {
    this.spinner = true;
    this.servicosServices.getServicos().subscribe({
      next: (response: any) => {
        this.items = response.data;
        this.lastIndex = this.items.length - 1;
        this.updateCard();
        this.spinner = false;

        setTimeout(() => {
          this.calculateWidth();
        }, 300);
      },
      error: (error) => {
        console.error('Erro ao carregar serviços:', error);
        this.spinner = false;
      },
    });
  }

  constructor(
    private servicosServices: ServicosService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.calculateWidth();
    window.addEventListener('resize', this.calculateWidth.bind(this));
    this.startAutoSlide();
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.calculateWidth.bind(this));
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  calculateWidth() {
    if (this.carouselContainer && this.carouselContainer.nativeElement) {
      this.containerWidth = this.carouselContainer.nativeElement.offsetWidth;
    }
    console.log(this.containerWidth);
  }

  get currentTranslate(): number {
    return -this.currentIndex * this.containerWidth;
  }

  next(): void {
    if (this.currentIndex < this.items.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updateCard();
    this.resetAutoSlide();
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.items.length - 1;
    }
    this.updateCard();
    this.resetAutoSlide();
  }

  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  startAutoSlide() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.next();
      }, 12000);
    }
  }

  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  updateCard() {
    this.cards = [
      {
        text1: this.items[this.currentIndex].conteudo1,
        text2: this.items[this.currentIndex].conteudo2,
        text3: this.items[this.currentIndex].conteudo3,
      },
    ];
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.updateCard();
    this.resetAutoSlide();
  }

  onTouchStart(event: TouchEvent): void {
    this.isDragging = true;
    this.startX = event.touches[0].clientX;
    this.stopAutoSlide();
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    this.deltaX = event.touches[0].clientX - this.startX;
  }

  onTouchEnd(): void {
    if (!this.isDragging) return;
    this.isDragging = false;

    // Verificar a direção do arrasto para toque
    if (this.deltaX > 50) {
      this.prev(); // Arrasto para a direita
    } else if (this.deltaX < -50) {
      this.next(); // Arrasto para a esquerda
    }

    this.deltaX = 0;
    this.startAutoSlide(); // Reinicia o auto-slide
  }

  // Função para capturar o início do movimento do mouse
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.draggingMouse = true; // Ativa a classe no-select
    this.startX = event.clientX;
    this.stopAutoSlide();
  }

  // Função para capturar o movimento do mouse enquanto arrasta
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    this.deltaX = event.clientX - this.startX;
  }

  // Função para capturar o fim do movimento do mouse
  onMouseUp(): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.draggingMouse = false; // Remove a classe no-select

    // Verificar a direção do arrasto
    if (this.deltaX > 50) {
      this.prev(); // Arrasto para a direita
    } else if (this.deltaX < -50) {
      this.next(); // Arrasto para a esquerda
    }

    this.deltaX = 0;
    this.startAutoSlide(); // Reinicia o auto-slide
  }

  openContactModal(): void {
    this.dialog.open(ContactFormComponent, {
      minWidth: 'auto',
      height: 'auto',
      panelClass: 'custom-dialog-container',
    });
  }
}
