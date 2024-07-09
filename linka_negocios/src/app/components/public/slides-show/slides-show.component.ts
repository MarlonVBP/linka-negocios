import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-slides-show',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './slides-show.component.html',
  styleUrl: './slides-show.component.scss'
})
export class SlidesShowComponent implements OnDestroy {
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

  constructor(){
    this.showSlides();
  }

  ngOnDestroy() {

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
