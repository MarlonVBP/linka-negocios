import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    imports: [RouterLink],
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private route: Router){

  }
}
