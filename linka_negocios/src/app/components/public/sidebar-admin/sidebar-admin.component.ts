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

  toggleSubMenu() {
    this.isPostsSubMenuOpen = !this.isPostsSubMenuOpen;
  }

  logout() {
    this.loginService.deslogar();
  }
}
