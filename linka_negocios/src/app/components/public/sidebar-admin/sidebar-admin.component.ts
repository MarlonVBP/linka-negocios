import { Component } from '@angular/core';
import { NgClass, CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [CommonModule, NgClass, RouterLink],
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent {
  activeUrl: any = '';

  isMenuOpen = false;
  isPostsSubMenuOpen = false;
  isProductsSubMenuOpen = false;
  isHomepageSubMenuOpen = false;

  constructor(private loginService: LoginService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.activeUrl = this.router.url;
      console.log(this.activeUrl)
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  togglePostsSubMenu() {
    this.isPostsSubMenuOpen = !this.isPostsSubMenuOpen;
  }

  toggleProductsSubMenu() {
    this.isProductsSubMenuOpen = !this.isProductsSubMenuOpen;
  }

  logout() {
    this.loginService.deslogar();
  }
  toggleHomepageSubMenu(){
    this.isHomepageSubMenuOpen = !this.isHomepageSubMenuOpen;
  }
}
