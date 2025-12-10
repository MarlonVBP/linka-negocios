import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-avaliacoes',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './avaliacoes.component.html',
    styleUrl: './avaliacoes.component.scss'
})
export class AvaliacoesComponent {
  @Input() avaliacoes: any[] = [];
  expanded = false;

  toggleExpand() {
    this.expanded = !this.expanded;
  }
}