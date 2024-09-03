import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { ModalAvaliacoesComponent } from '../../../components/public/modal-avaliacoes/modal-avaliacoes.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [FooterComponent, SidebarClienteComponent, CommonModule, AvaliacoesComponent, ReactiveFormsModule, IconeWhatsappComponent],
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {
  @ViewChild('messageRating') messageRatingRef!: ElementRef<HTMLSpanElement>;

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
  id_produto: any;
  isModalOpen: boolean = false;

  stars: boolean[] = Array(5).fill(false);
  rating = 0;
  hoverState = 0;
  rating_post: string = '';

  comentariosForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    conteudo: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(200)]),
    profissao: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    empresa: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
  });

  getErrorMessage(controlName: string): string {
    const control = this.comentariosForm.get(controlName);
    if (control && control.invalid && (control.dirty || control.touched)) {
      if (control.errors?.['required']) {
        return 'Campo obrigatório';
      }
      if (control.errors?.['email']) {
        return 'Email inválido';
      }
      if (control.errors?.['minlength']) {
        return `O campo deve ter no mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      }
      if (control.errors?.['maxlength']) {
        return `O campo deve ter no máximo ${control.errors['maxlength'].requiredLength} caracteres`;
      }
    }
    return '';
  }

  submitApplication(): void {
    if (this.comentariosForm.invalid) {
      this.comentariosForm.markAllAsTouched();
      return;
    }

    this.rating_post = '';
    for (let i = 1; i <= 5; i++) {
      this.rating_post += this.rating >= i ? '&#9733;' : '&#9734;';
    }

    if (this.rating < 1 || this.rating > 5) {
      this.messageRatingRef.nativeElement.classList.add('show');
      setTimeout(() => {
        this.messageRatingRef.nativeElement.classList.remove('show');
      }, 1000);

      return;
    }

    const comentario = {
      id: this.id_produto,
      email: this.comentariosForm.value.email,
      user_name: this.comentariosForm.value.nome,
      conteudo: this.comentariosForm.value.conteudo,
      profissao: this.comentariosForm.value.profissao,
      empresa: this.comentariosForm.value.empresa,
      avaliacao: this.rating,
    };

    this.comentariosService.create_prod(comentario).subscribe(
      () => {
        this.comentariosService.read_prod(this.id_produto).subscribe((response: any) => {
          this.avaliacoes = response.response;
          console.log(this.avaliacoes)
        });
      },
      (error) => {
        console.error('Erro ao criar comentário:', error);
      }
    );

    this.closeModalForm();
    this.comentariosForm.reset();
  }

  rate(rating: number): void {
    this.rating = rating;
    console.log('Avaliação selecionada:', this.rating);
  }

  hover(index: number): void {
    this.hoverState = index;
  }

  reset(): void {
    this.hoverState = 0;
  }


  constructor(
    private route: ActivatedRoute,
    private produtosService: ProdutosService,
    private comentariosService: ComentariosService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadAvaliacoes();
    this.loadProduto();
  }

  loadProduto() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.id_produto = +params['id'];
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
    this.comentariosService.read_prod(this.id_produto).subscribe((response: any) => {
      if (response.success) {
        this.avaliacoes = response.response;
        console.log(this.avaliacoes)
      }
    });
  }

  redirectToPage(): void {
    const url = this.produto?.cta || '#';
    window.open(url, '_blank');
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

  openModalForm() {
    this.isModalOpen = true;
  }

  closeModalForm() {
    this.isModalOpen = false;
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