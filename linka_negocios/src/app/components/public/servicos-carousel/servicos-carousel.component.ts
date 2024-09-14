import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Card } from '../../../models/card';
import { ServicosService } from '../../../services/servicos.service';

@Component({
  selector: 'app-servicos-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicos-carousel.component.html',
  styleUrls: ['./servicos-carousel.component.scss']
})

export class ServicosCarouselComponent implements AfterViewInit, OnDestroy {
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  items: any[] = [];

  currentIndex = 0;
  lastIndex = 0;
  containerWidth = 0;
  intervalId: any;
  cards: Card[] = [];

  constructor(private servicosServices: ServicosService) {
    this.servicosServices.getServicos().subscribe((response: any) => {
      this.items = response.data;
      this.lastIndex = this.items.length - 1;
      this.updateCard();
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

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 12000);
  }

  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  updateCard() {
    this.cards = [{
      text1: this.items[this.currentIndex].conteudo1,
      text2: this.items[this.currentIndex].conteudo2,
      text3: this.items[this.currentIndex].conteudo3,
    }];
  }
}
