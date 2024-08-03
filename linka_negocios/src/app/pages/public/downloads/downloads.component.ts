import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { AvaliacoesComponent } from "../../../components/public/avaliacoes/avaliacoes.component";
import { ModalAvaliacoesComponent } from '../../../components/public/modal-avaliacoes/modal-avaliacoes.component';
import { MatDialog } from '@angular/material/dialog';
import { Faq } from '../../../models/faq';
import { Comentario } from '../../../models/comentario';
import { ComentariosService } from '../../../services/comentarios.service';
import { FaqsService } from '../../../services/faqs.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProdutosService } from '../../../services/produtos.service';
import { Produto } from '../../../models/produtos';

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [FooterComponent, SidebarClienteComponent, CommonModule, AvaliacoesComponent, ReactiveFormsModule],
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {
  faqForms = new FormGroup({
    pergunta: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)])
  });

  produtos: Produto[] = [];
  selectedProduct: Produto | null = null; // Adicione esta propriedade
  avaliacoes: Comentario[] = [];
  perguntas: Faq[] = [];
  startIndex = 0;
  endIndex = 5;
  showMore = true;

  constructor(
    public dialog: MatDialog,
    private comentariosService: ComentariosService,
    private faqsService: FaqsService,
    private produtosService: ProdutosService
  ) {}

  ngOnInit() {
    this.loadAvaliacoes();
    this.loadFaqs();
    this.loadProdutos();
  }

  redirectToPage(): void {
    const url = this.produtos[0].cta || '#';
    window.open(url, '_blank'); 
  }

  loadAvaliacoes() {
    this.comentariosService.read_pag(3).subscribe((response: any) => {
      if (response.success) {
        this.avaliacoes = response.response;
      }
    });
  }

  loadFaqs() {
    this.faqsService.read().subscribe((response: any) => {
      if (response.success) {
        this.perguntas = response.response;
      }
    });
  }

  loadProdutos() {
    this.produtosService.read().subscribe((data: any) => {
      if (data.success) {
        this.produtos = data.data;
        console.log("Produto:", this.produtos)
        if (this.produtos.length > 0) {
          this.populateProdutoDetails(this.produtos[0]);
        }
      }
    });
  }

  populateProdutoDetails(produto: Produto) {
    // Aqui você pode preencher as seções da página com os dados do produto
    // Exemplo:
    // this.titulo = produto.titulo_breve;
    // this.detalhes = produto.detalhes_problema_beneficios;
    // E assim por diante
  }

  submitFaqForms(form: any) {
    if (this.faqForms.valid) {
      this.faqsService.create(form).subscribe(() => {
        this.loadFaqs();
      });
    }
    this.showMore = this.endIndex <= this.perguntas.length;
  }

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
      respostaElement.style.maxHeight = respostaElement.scrollHeight + 'px';
    } else {
      respostaElement.style.maxHeight = '0';
    }
  }

  verMais() {
    this.startIndex += 5;
    this.endIndex += 5;
    this.showMore = this.endIndex <= this.perguntas.length;
  }

  verMenos() {
    this.startIndex -= 5;
    this.endIndex -= 5;
    this.showMore = true;
  }
}
