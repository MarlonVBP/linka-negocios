import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'app-insights-sidebar',
    imports: [CommonModule, RouterLink],
    standalone: true,
    templateUrl: './insights-sidebar.component.html',
    styleUrl: './insights-sidebar.component.scss'
})
export class InsightsSidebarComponent {
  constructor(private location: Location, private router: Router) {}

  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
