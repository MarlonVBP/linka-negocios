import { CommonModule} from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarClienteComponent } from '../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule, SidebarClienteComponent, FooterComponent]
})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'Home';

  slides = [
    { title: 'Slide 1 Title', description: 'Slide 1 Description', image: 'https://a.imagem.app/3qu6ct.png' },
    { title: 'Slide 2 Title', description: 'Slide 2 Description', image: 'https://a.imagem.app/3qQJoG.png' },
    { title: 'Slide 3 Title', description: 'Slide 3 Description', image: 'https://a.imagem.app/3qu6ct.png' }
  ];

  currentSlideIndex: number = 0;
  slideInterval: any;

  ngOnInit() {
    this.showSlides();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  showSlides(): void {
    this.slideInterval = setInterval(() => {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
    }, 5000); 
  }

  changeSlide(n: number): void {
    this.currentSlideIndex = (this.currentSlideIndex + n + this.slides.length) % this.slides.length;
  }

  currentSlide(n: number): void {
    this.currentSlideIndex = n;
  }
  
}
