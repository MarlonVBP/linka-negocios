import { Component } from '@angular/core';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { ServicosCarouselComponent } from '../../../components/public/servicos-carousel/servicos-carousel.component';
import { ModalAvaliacoesComponent } from '../../../components/public/modal-avaliacoes/modal-avaliacoes.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-servicos-page',
  standalone: true,
  imports: [SidebarClienteComponent, FooterComponent, ServicosCarouselComponent],
  templateUrl: './servicos-page.component.html',
  styleUrl: './servicos-page.component.scss'
})
export class ServicosPageComponent {
  servicos = [
    {
      title: 'Serviços de RH',
      description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit quisquam est qui dolorem ipsum quia dolor sit amet, a dolor sit amet, consectetur, adipisci vm quia dolor sit amet, consectetur, adipisci velit quisquam est qui dolorem',
      img: 'https://a.imagem.app/3qQJoG.png',
      cards: [
        { title: 'Beneficio 1', text: 'Qual problema ela resolve? Descreva aqui e tente provar o seu ponto.' },
        { title: 'Beneficio 2', text: 'Qual problema ela resolve? Descreva aqui e tente provar o seu ponto.' },
        { title: 'Beneficio 3', text: 'Qual problema ela resolve? Descreva aqui e tente provar o seu ponto.' }
      ]
    },
    {
      title: 'Serviços de processos',
      description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit quisquam est qui dolorem ipsum quia dolor sit amet, a dolor sit amet, consectetur, adipisci vm quia dolor sit amet, consectetur, adipisci velit quisquam est qui dolorem',
      img: 'https://a.imagem.app/3qu6ct.png',
      cards: [
        { title: 'Beneficio 1', text: 'Qual problema ela resolve? Descreva aqui e tente provar o seu ponto.' },
        { title: 'Beneficio 2', text: 'Qual problema ela resolve? Descreva aqui e tente provar o seu ponto.' },
        { title: 'Beneficio 3', text: 'Qual problema ela resolve? Descreva aqui e tente provar o seu ponto.' }
      ]
    },
    {
      title: 'Serviços de vendas',
      description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit quisquam est qui dolorem ipsum quia dolor sit amet, a dolor sit amet, consectetur, adipisci vm quia dolor sit amet, consectetur, adipisci velit quisquam est qui dolorem',
      img: 'https://a.imagem.app/3qQJoG.png',
      cards: [
        { title: 'Beneficio 1', text: 'Qual problema ela resolve? Descreva aqui e tente provar o seu ponto.' },
        { title: 'Beneficio 2', text: 'Qual problema ela resolve? Descreva aqui e tente provar o seu ponto.' },
        { title: 'Beneficio 3', text: 'Qual problema ela resolve? Descreva aqui e tente provar o seu ponto.' }
      ]
    },
  ];

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

  constructor(public dialog: MatDialog) {
    
  }


  openModal(): void {
    this.dialog.open(ModalAvaliacoesComponent, {
      minWidth: '70vw',
      height: '70vh',
      panelClass: 'custom-dialog-container',
      data: this.avaliacoes
    });

  }
}
