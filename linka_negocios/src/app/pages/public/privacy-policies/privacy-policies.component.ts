import { Component } from '@angular/core';
import { SidebarClienteComponent } from "../../../components/public/sidebar-cliente/sidebar-cliente.component";
import { FooterComponent } from "../../../components/public/footer/footer.component";

@Component({
  selector: 'app-privacy-policies',
  standalone: true,
  imports: [SidebarClienteComponent, FooterComponent],
  templateUrl: './privacy-policies.component.html',
  styleUrl: './privacy-policies.component.scss'
})
export class PrivacyPoliciesComponent {

  constructor() { }

}
