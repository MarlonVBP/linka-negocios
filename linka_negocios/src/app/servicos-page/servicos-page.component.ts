import { Component } from '@angular/core';
import { SidebarClienteComponent } from '../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../components/public/footer/footer.component';

@Component({
  selector: 'app-servicos-page',
  standalone: true,
  imports: [SidebarClienteComponent, FooterComponent],
  templateUrl: './servicos-page.component.html',
  styleUrl: './servicos-page.component.scss'
})
export class ServicosPageComponent {

}
