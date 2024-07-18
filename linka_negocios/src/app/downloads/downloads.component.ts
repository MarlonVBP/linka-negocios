import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../components/public/footer/footer.component';
import { SidebarClienteComponent } from '../components/public/sidebar-cliente/sidebar-cliente.component';

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [FooterComponent, SidebarClienteComponent, CommonModule],
  templateUrl: './downloads.component.html',
  styleUrl: './downloads.component.scss'
})
export class DownloadsComponent {
  expanded: boolean = false;

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  perguntas: any[] = [
    {
      titulo: 'Pergunta número um',
      resposta: 'Resposta da pergunta número um.',
      active: false
    },
    {
      titulo: 'Pergunta número dois',
      resposta: 'Resposta da pergunta número dois.',
      active: false
    },
    {
      titulo: 'Pergunta número três',
      resposta: 'Resposta da pergunta número três.',
      active: false
    },
    {
      titulo: 'Pergunta número quatro',
      resposta: 'Resposta da pergunta número quatro.',
      active: false
    },
    {
      titulo: 'Pergunta número cinco',
      resposta: 'Resposta da pergunta número cinco.',
      active: false
    }
  ];

  toggleResposta(pergunta: any, respostaElement: HTMLElement) {
    pergunta.active = !pergunta.active;

    if (pergunta.active) {
      respostaElement.style.maxHeight = respostaElement.scrollHeight + "px";
    } else {
      respostaElement.style.maxHeight = '0';
    }
  }
}
