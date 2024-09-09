import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Card } from '../../../models/card';
import { ServicosService } from '../../../services/servicos.service';

@Component({
  selector: 'app-servicos-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicos-carousel.component.html',
  styleUrl: './servicos-carousel.component.scss'
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

      this.cards = [{
        text1: this.items[this.currentIndex].conteudo1,
        text2: this.items[this.currentIndex].conteudo2,
        text3: this.items[this.currentIndex].conteudo3,
      }];
    })

  }

  ngAfterViewInit() {
    this.calculateWidth();
    window.addEventListener('resize', this.calculateWidth.bind(this)); // Recalcula a largura ao redimensionar a janela
    this.startAutoSlide(); // Inicia o auto-slide
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.calculateWidth.bind(this)); // Remove o listener ao destruir o componente
    }
    if (this.intervalId) {
      clearInterval(this.intervalId); // Limpa o intervalo ao destruir o componente
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
      this.cards = [{
        text1: this.items[this.currentIndex].conteudo1,
        text2: this.items[this.currentIndex].conteudo2,
        text3: this.items[this.currentIndex].conteudo3,
      }];
    } else {
      this.currentIndex = 0; // Reinicia o carousel ao chegar ao fim
      this.cards = [{
        text1: this.items[this.currentIndex].conteudo1,
        text2: this.items[this.currentIndex].conteudo2,
        text3: this.items[this.currentIndex].conteudo3,
      }];
    }
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.cards = [{
        text1: this.items[this.currentIndex].conteudo1,
        text2: this.items[this.currentIndex].conteudo2,
        text3: this.items[this.currentIndex].conteudo3,
      }];
    } else {
      this.currentIndex = this.items.length - 1; // Vai para o último item se estiver no primeiro
      this.cards = [{
        text1: this.items[this.currentIndex].conteudo1,
        text2: this.items[this.currentIndex].conteudo2,
        text3: this.items[this.currentIndex].conteudo3,
      }];
    }
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 5000); // Altera a cada 5 segundos
  }
}