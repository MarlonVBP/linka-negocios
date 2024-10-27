import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Card } from '../../../models/card';
import { ServicosService } from '../../../services/servicos.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-servicos-carousel',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './servicos-carousel.component.html',
  styleUrls: ['./servicos-carousel.component.scss'],
})
export class ServicosCarouselComponent implements AfterViewInit, OnDestroy {
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

  constructor(private servicosServices: ServicosService) {
    this.spinner = true;
    this.servicosServices.getServicos().subscribe((response: any) => {
      this.items = response.data;
      this.lastIndex = this.items.length - 1;
      this.updateCard();

      this.spinner = false;
    });
  }

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
}
