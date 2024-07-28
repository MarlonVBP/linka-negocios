import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DashboardComponent } from "../../../components/public/dashboard/dashboard.component";
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [SidebarAdminComponent, RouterLink, DashboardComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {
  @ViewChild('buttonMes') buttonMes!: ElementRef;
  @ViewChild('buttonAno') buttonAno!: ElementRef;

  toggleButton() {
    const mesElement = this.buttonMes.nativeElement;
    const anoElement = this.buttonAno.nativeElement;

    mesElement.classList.toggle('active');
    anoElement.classList.toggle('active');
  }

  totalPosts: number = 120; // Exemplo estático
  topPoster: string = 'Maria Silva'; // Exemplo estático
  postsThisMonth: number = 20; // Exemplo estático
  totalComments: number = 450; // Exemplo estático
}
