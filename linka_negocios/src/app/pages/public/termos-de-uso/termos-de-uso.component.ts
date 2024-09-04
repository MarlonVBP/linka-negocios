import { Component } from '@angular/core';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../../../components/public/footer/footer.component';

@Component({
  selector: 'app-termos-de-uso',
  standalone: true,
  imports: [SidebarClienteComponent, FooterComponent],
  templateUrl: './termos-de-uso.component.html',
  styleUrl: './termos-de-uso.component.scss'
})
export class TermosDeUsoComponent {

}
