import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.scss'
})
export class SidebarAdminComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
