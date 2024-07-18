import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { SidebarClienteComponent } from '../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../components/public/footer/footer.component';
import { SlidesShowComponent } from '../components/public/slides-show/slides-show.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, SidebarClienteComponent, FooterComponent, SlidesShowComponent]
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

  currentSlideIndex: number = 0;
  slideInterval: any;

  constructor() {
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval); // Limpa o intervalo ao destruir o componente
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
}
