import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-insights-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './insights-sidebar.component.html',
  styleUrl: './insights-sidebar.component.scss'
})
export class InsightsSidebarComponent {

}
