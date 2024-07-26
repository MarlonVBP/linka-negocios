import { Component } from '@angular/core';
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

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [FooterComponent, SidebarClienteComponent, CommonModule, AvaliacoesComponent, ReactiveFormsModule],
  templateUrl: './downloads.component.html',
  styleUrl: './downloads.component.scss'
})
export class DownloadsComponent {

  faqForms = new FormGroup({
    pergunta: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)])
  })

  constructor(public dialog: MatDialog, private comentariosService: ComentariosService, private faqsService: FaqsService) {

    this.comentariosService.read_pag(3).subscribe((response: any) => {
      console.log(response)

      if (response.success == true) {
        this.avaliacoes = response.response;
      }
    })

    this.faqsService.read().subscribe((response: any) => {
      if (response.success == true) {
        this.perguntas = response.response;
      }
    })
  }

  submitFaqForms(form: any) {
    console.log(form)

    if (this.faqForms.valid) {
      this.faqsService.create(form).subscribe(() => {
        this.faqsService.read().subscribe((response: any) => {
          if (response.success == true) {
            this.perguntas = response.response;
          }
        })
      })

      this.showMore = this.endIndex <= this.perguntas.length;
    }
  }

  avaliacoes: Comentario[] = [];

  perguntas: Faq[] = [];

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

  startIndex = 0;
  endIndex = 5; // Mostra os primeiros 5 itens
  showMore = true;

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
