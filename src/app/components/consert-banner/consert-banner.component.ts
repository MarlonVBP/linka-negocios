import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class ConsertBannerComponent implements OnInit, AfterViewInit {
  @ViewChild('consertBanner') conserBannerElement!: ElementRef<HTMLDivElement>;

  public consentGiven: boolean = false;

  constructor(private consentService: ConsentService, private route: Router) {
  }

  ngAfterViewInit(): void {
    console.log(localStorage.getItem('consentGiven'))
    if (!localStorage.getItem('consentGiven')) {
      this.conserBannerElement.nativeElement.classList.add('show');
    }
  }

  ngOnInit(): void {
    // Verifica se o consentimento já foi dado
    this.consentGiven = this.consentService.hasConsent();
    // Se o consentimento foi rejeitado, ocultar o banner
    if (this.consentService.getConsentStatus() === 'rejected') {
      this.consentGiven = false;
      this.conserBannerElement.nativeElement.classList.add('show');
    }
  }

  acceptConsent(): void {
    this.consentService.setConsent('accepted');
    this.consentGiven = true;
    this.conserBannerElement.nativeElement.classList.remove('show');
  }

  rejectConsent(): void {
    this.consentService.setConsent('rejected');
    this.consentGiven = true;
    this.conserBannerElement.nativeElement.classList.remove('show');

  }
}