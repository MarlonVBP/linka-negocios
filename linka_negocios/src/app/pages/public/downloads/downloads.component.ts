import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { AvaliacoesComponent } from "../../../components/public/avaliacoes/avaliacoes.component";
import { ModalAvaliacoesComponent } from '../../../components/public/modal-avaliacoes/modal-avaliacoes.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [FooterComponent, SidebarClienteComponent, CommonModule, AvaliacoesComponent],
  templateUrl: './downloads.component.html',
  styleUrl: './downloads.component.scss'
})
export class DownloadsComponent {

  constructor(public dialog: MatDialog) {

  }


  avaliacoes = [
    {
      conteudo: "Depoimento que alguém escreveu destacando os benefícios ou ganhos que teve ao usar o seu produto/serviço.",
      avatarUrl: "https://a.imagem.app/3qQLht.png",
      nome: "Nome Sobrenome",
      profissao: "Profissão",
      empresa: "Empresa"
    },
    {
      conteudo: "Depoimento que alguém escreveu destacando os benefícios ou ganhos que teve ao usar o seu produto/serviço.",
      avatarUrl: "https://a.imagem.app/3qQLht.png",
      nome: "Nome Sobrenome",
      profissao: "Profissão",
      empresa: "Empresa"
    },
    {
      conteudo: "Depoimento que alguém escreveu destacando os benefícios ou ganhos que teve ao usar o seu produto/serviço.",
      avatarUrl: "https://a.imagem.app/3qQLht.png",
      nome: "Nome Sobrenome",
      profissao: "Profissão",
      empresa: "Empresa"
    },
    {
      conteudo: "Depoimento que alguém escreveu destacando os benefícios ou ganhos que teve ao usar o seu produto/serviço.",
      avatarUrl: "https://a.imagem.app/3qQLht.png",
      nome: "Nome Sobrenome",
      profissao: "Profissão",
      empresa: "Empresa"
    },
    {
      conteudo: "Depoimento que alguém escreveu destacando os benefícios ou ganhos que teve ao usar o seu produto/serviço.",
      avatarUrl: "https://a.imagem.app/3qQLht.png",
      nome: "Nome Sobrenome",
      profissao: "Profissão",
      empresa: "Empresa"
    },
  ];

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

  openModal(): void {
    this.dialog.open(ModalAvaliacoesComponent, {
      minWidth: '70vw',
      height: '70vh',
      panelClass: 'custom-dialog-container',
      data: this.avaliacoes
    });

  }

  toggleResposta(pergunta: any, respostaElement: HTMLElement) {
    pergunta.active = !pergunta.active;

    if (pergunta.active) {
      respostaElement.style.maxHeight = respostaElement.scrollHeight + "px";
    } else {
      respostaElement.style.maxHeight = '0';
    }
  }
}
