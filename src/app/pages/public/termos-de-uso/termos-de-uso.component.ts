import { Component } from '@angular/core';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { ConsoleAlertService } from '../../../services/console-alert.service';

@Component({
    selector: 'app-termos-de-uso',
    imports: [SidebarClienteComponent, FooterComponent],
    templateUrl: './termos-de-uso.component.html',
    styleUrl: './termos-de-uso.component.scss'
})
export class TermosDeUsoComponent {
  constructor(private alerMensage: ConsoleAlertService) {
    this.alerMensage.alertFunction();
  }
}
