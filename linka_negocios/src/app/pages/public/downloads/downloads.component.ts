import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { AvaliacoesComponent } from "../../../components/public/avaliacoes/avaliacoes.component";
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProdutosService } from '../../../services/produtos.service';
import { Produto } from '../../../models/produtos';
import { Comentario } from '../../../models/comentario';
import { Faq } from '../../../models/faq';
import { ComentariosService } from '../../../services/comentarios.service';
import { FaqsService } from '../../../services/faqs.service';
import { IconeWhatsappComponent } from '../../../components/public/icone-whatsapp/icone-whatsapp.component';

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [FooterComponent, SidebarClienteComponent, CommonModule, AvaliacoesComponent, ReactiveFormsModule, IconeWhatsappComponent],
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {
  faqForms = new FormGroup({
    pergunta: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)])
  });

  produto: Produto | null = null;
  avaliacoes: Comentario[] = [];
  perguntas: Faq[] = [];
  startIndex = 0;
  endIndex = 5;
  showMore = true;
  activeIndex: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private produtosService: ProdutosService,
    private comentariosService: ComentariosService,
    private faqsService: FaqsService
  ) {}

  ngOnInit() {
    this.loadAvaliacoes();
    this.loadFaqs();
    this.loadProduto();
  }

  loadProduto() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.produtosService.getProdutoById(id).subscribe((data: any) => {
          if (data.success) {
            // Filtra o produto pelo ID
            this.produto = data.data.find((item: Produto) => item.id === id) || null;
          }
        });
      }
    });
  }

  loadAvaliacoes() {
    this.comentariosService.read_pag(3).subscribe((response: any) => {
      if (response.success) {
        this.avaliacoes = response.response;
      }
    });
  }

  redirectToPage(): void {
    const url = this.produto?.cta || '#';
    window.open(url, '_blank'); 
  }

  loadFaqs() {
    this.faqsService.read().subscribe((response: any) => {
      if (response.success) {
        this.perguntas = response.response;
      }
    });
  }

  toggleResposta(index: number, respostaElement: HTMLElement) {
    if (this.activeIndex === index) {
      this.activeIndex = null;
    } else {
      this.activeIndex = index;
    }
  
    if (this.activeIndex === index) {
      respostaElement.style.maxHeight = respostaElement.scrollHeight + 'px';
    } else {
      respostaElement.style.maxHeight = '0';
    }
  }
}