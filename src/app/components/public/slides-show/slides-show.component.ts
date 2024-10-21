import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ServicosService } from '../../../services/servicos.service';

@Component({
  selector: 'app-slides-show',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './slides-show.component.html',
  styleUrls: ['./slides-show.component.scss']
})
export class SlidesShowComponent implements OnInit, OnDestroy {
  title = 'Home';

  slides: any[] = [];
  currentSlideIndex: number = 0;
  slideInterval: any;

  constructor(private servicoService: ServicosService) {}

  ngOnInit() {
    this.servicoService.getServicos().subscribe(response => {
      if (response && response.success === 1 && Array.isArray(response.data)) {
        this.slides = response.data.map((servico: any) => ({
          title: servico.titulo,
          description: servico.descricao,
          image: servico.imagem
        }));
        this.showSlides();
      } else {
        console.error('Estrutura da resposta da API inválida:', response);
      }
    }, error => {
      console.error('Erro ao buscar dados da API:', error);
    });
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearTimeout(this.slideInterval);
    }
  }

  showSlides(): void {
    const updateSlide = () => {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
      this.slideInterval = setTimeout(() => {
        requestAnimationFrame(updateSlide);
      }, 3000);
    };
    updateSlide();
  }

  changeSlide(n: number): void {
    this.currentSlideIndex = (this.currentSlideIndex + n + this.slides.length) % this.slides.length;
  }

  currentSlide(n: number): void {
    this.currentSlideIndex = n % this.slides.length;
  }
}
