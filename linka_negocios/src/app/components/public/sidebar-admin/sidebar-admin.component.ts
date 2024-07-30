import { Component } from '@angular/core';
import { NgClass, CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [CommonModule, NgClass, RouterLink],
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent {
  isMenuOpen = false;
  isPostsSubMenuOpen = false;

  constructor(private loginService: LoginService) {}

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
