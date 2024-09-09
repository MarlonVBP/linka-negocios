import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { ServicosCarouselComponent } from '../../../components/public/servicos-carousel/servicos-carousel.component';
import { ModalAvaliacoesComponent } from '../../../components/public/modal-avaliacoes/modal-avaliacoes.component';
import { MatDialog } from '@angular/material/dialog';
import { ComentariosService } from '../../../services/comentarios.service';
import { Comentario } from '../../../models/comentario';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from "../../../components/public/spinner/spinner.component";
import { AvaliacoesComponent } from "../../../components/public/avaliacoes/avaliacoes.component";
import { IconeWhatsappComponent } from '../../../components/public/icone-whatsapp/icone-whatsapp.component';
import { ServicosService } from '../../../services/servicos.service';

@Component({
  selector: 'app-servicos-page',
  standalone: true,
  imports: [SidebarClienteComponent, FooterComponent, ServicosCarouselComponent, CommonModule, ReactiveFormsModule, SpinnerComponent, AvaliacoesComponent, IconeWhatsappComponent],
  templateUrl: './servicos-page.component.html',
  styleUrl: './servicos-page.component.scss'
})
export class ServicosPageComponent {
  @ViewChild('messageRating') messageRatingRef!: ElementRef<HTMLSpanElement>;

  private pagina_id: number = 2;

  stars: boolean[] = Array(5).fill(false);
  rating = 0;
  hoverState = 0;
  rating_post: string = '';

  avaliacoes: Comentario[] = [];

  load_spinner: boolean = false;

  constructor(public dialog: MatDialog, private comentariosService: ComentariosService) {
    this.load_spinner = true;
    this.comentariosService.read_pag(2).subscribe((response: any) => {
      this.load_spinner = false;
      if (response.success == true) {
        this.avaliacoes = response.response;
        return;
      }
      this.avaliacoes = [];
    })
  }

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
      id: this.pagina_id,
      email: this.comentariosForm.value.email,
      user_name: this.comentariosForm.value.nome,
      conteudo: this.comentariosForm.value.conteudo,
      profissao: this.comentariosForm.value.profissao,
      empresa: this.comentariosForm.value.empresa,
      avaliacao: this.rating,
    };

    this.comentariosService.create_pag(comentario).subscribe(
      () => {
        this.comentariosService.read_pag(this.pagina_id).subscribe((response: any) => {
          this.avaliacoes = response.response;
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

  isModalOpen = false;

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
