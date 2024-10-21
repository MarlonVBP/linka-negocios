import { Component, OnInit } from '@angular/core';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { ScrollTopService } from '../../../services/scroll-top.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ConsoleAlertService } from '../../../services/console-alert.service';

@Component({
  selector: 'app-privacy-policies',
  standalone: true,
  imports: [SidebarClienteComponent, FooterComponent],
  templateUrl: './privacy-policies.component.html',
  styleUrl: './privacy-policies.component.scss',
})
export class PrivacyPoliciesComponent implements OnInit {
  constructor(
    private router: Router,
    private scrollService: ScrollTopService,
    private alerMensage: ConsoleAlertService
  ) {
    this.alerMensage.alertFunction();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.scrollService.scrollToTop();
      });
  }
}
