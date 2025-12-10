import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { ConsoleAlertService } from '../../../services/console-alert.service';

@Component({
    selector: 'app-not-found',
    imports: [RouterLink],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(20px)' }),
                animate('0.5s ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
        ]),
    ],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  constructor(private alerMensage: ConsoleAlertService) {
    this.alerMensage.alertFunction();
  }
}
