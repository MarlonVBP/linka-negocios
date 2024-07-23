import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sobre-nos',
  standalone: true,
  imports: [SidebarClienteComponent, FooterComponent],
  templateUrl: './sobre-nos.component.html',
  styleUrl: './sobre-nos.component.scss'
})
export class SobreNosComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.addScrollEventListeners();
    }
  }

  addScrollEventListeners(): void {
    const buttons = document.querySelectorAll('.scroll-button');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const targetId = (button as HTMLElement).getAttribute('data-target');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: (targetElement as HTMLElement).offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }
}
