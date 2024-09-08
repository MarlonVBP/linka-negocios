import { Component, OnInit } from '@angular/core';
import { ConsentService } from '../../services/cookies/consent.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-consert-banner',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './consert-banner.component.html',
  styleUrl: './consert-banner.component.scss'
})
export class ConsertBannerComponent implements OnInit {

  public consentGiven: boolean = false;

  constructor(private consentService: ConsentService, private route: Router) { }

  ngOnInit(): void {
    // Verifica se o consentimento já foi dado
    this.consentGiven = this.consentService.hasConsent();
    // Se o consentimento foi rejeitado, ocultar o banner
    if (this.consentService.getConsentStatus() === 'rejected') {
      this.consentGiven = false;
    }
  }

  acceptConsent(): void {
    this.consentService.setConsent('accepted');
    this.consentGiven = true;
  }

  rejectConsent(): void {
    this.consentService.setConsent('rejected');
    this.consentGiven = true;
  }
}