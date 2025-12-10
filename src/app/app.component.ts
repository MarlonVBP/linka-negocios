import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ConsertBannerComponent } from "./components/consert-banner/consert-banner.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterModule, ConsertBannerComponent],
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Linka Negócios';
}
