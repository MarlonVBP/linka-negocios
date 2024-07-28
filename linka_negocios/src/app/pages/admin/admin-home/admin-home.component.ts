import { Component } from '@angular/core';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [SidebarAdminComponent, RouterLink],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {
  totalPosts: number = 120; // Exemplo estático
  topPoster: string = 'Maria Silva'; // Exemplo estático
  postsThisMonth: number = 20; // Exemplo estático
  totalComments: number = 450; // Exemplo estático

  constructor() { }
}
