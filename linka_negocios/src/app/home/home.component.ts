import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarClienteComponent } from '../components/public/sidebar-cliente/sidebar-cliente.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule, SidebarClienteComponent]
})
export class HomeComponent {
  title = 'Home';
}
