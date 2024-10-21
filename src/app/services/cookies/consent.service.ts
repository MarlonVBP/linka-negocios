import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {

  constructor() { }

  public setConsent(consentStatus: 'accepted' | 'rejected'): void {
    localStorage.setItem('consentGiven', 'true');
    localStorage.setItem('consentStatus', consentStatus);
    this.updateConsentInGTag(consentStatus);
  }

  private updateConsentInGTag(consentStatus: 'accepted' | 'rejected'): void {
    const adStorage = consentStatus === 'accepted' ? 'granted' : 'denied';
    const analyticsStorage = consentStatus === 'accepted' ? 'granted' : 'denied';

    // Verifique se o gtag está carregado
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': adStorage,
        'analytics_storage': analyticsStorage
      });
    }
  }

  public hasConsent(): boolean {
    return localStorage.getItem('consentGiven') === 'true';
  }

  public getConsentStatus(): 'accepted' | 'rejected' | null {
    return localStorage.getItem('consentStatus') as 'accepted' | 'rejected' | null;
  }
}