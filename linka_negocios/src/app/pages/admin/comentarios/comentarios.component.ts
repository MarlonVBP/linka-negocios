import { Component, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SidebarAdminComponent } from "../../../components/public/sidebar-admin/sidebar-admin.component";
import { ComentariosService } from '../../../services/comentarios.service';
import { CapitalizeFirstPipe } from '../../../pipes/capitalize-first.pipe';
import { CommonModule } from '@angular/common';
import { Comentario } from '../../../models/comentario';
import { AvaliacoesComponent } from "../../../components/public/avaliacoes/avaliacoes.component";
import { Subscription, fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import lottie from 'lottie-web';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [SidebarAdminComponent, CapitalizeFirstPipe, CommonModule, AvaliacoesComponent, MatCheckboxModule],
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // Inicializar a animação após a visualização do componente
    lottie.loadAnimation({
      container: document.getElementById('animationContainer') as HTMLElement, // Seletor do contêiner da animação
      renderer: 'svg', // O tipo de renderizador, pode ser 'svg', 'canvas' ou 'html'
      loop: true, // Se a animação deve se repetir
      autoplay: true, // Se a animação deve iniciar automaticamente
      path: 'images/animations/animation1.json' // Caminho para o arquivo JSON da animação
    });


    if (this.comentariosPaginas.length >= 1 && this.comentariosPost.length == 0) {
      this.toggleButton();
    }

  }

  comentariosVistos: number[] = [];
  selecionarTodos: boolean = false;

  marcarComoVisto(number: number) {
    const index = this.comentariosVistos.indexOf(number);

    if (!this.comentariosVistos.includes(number)) {
      this.comentariosVistos.push(number);
      console.log(this.comentariosVistos);
      return;
    }
    this.comentariosVistos.splice(index, 1);
    console.log(this.comentariosVistos);
  }

  selecionarTodosComentarios(bool: boolean) {
    this.selecionarTodos = bool;
    if (bool) {
      this.comentariosVistos = this.comentarios.map(comentario => comentario.id);
      console.log(this.comentariosVistos);
      return;
    }
    this.comentariosVistos = [];
    console.log(this.comentariosVistos);
  }

  marcarComentarios(tipo: boolean, ids: number[]) {
    if (tipo) {
      this.comentariosService.mark_comments_as_read_post(ids).subscribe(
        (response: any) => {
          console.log(response);
          if (response.success) {
            this.comentariosService.read_post().subscribe();
          }
        }
      )
      return;
    }
    this.comentariosService.mark_comments_as_read_pag(ids).subscribe(
      (response: any) => {
        console.log(response);
        if (response.success) {
          this.comentariosService.read_pag().subscribe();
        }
      }
    )
  }

  comentarios: Comentario[] = [];
  comentariosPost: Comentario[] = [];
  comentariosPaginas: Comentario[] = [];
  isPostComments: boolean = true; // Estado para verificar o tipo de comentários exibidos

  @ViewChild('buttonPost') buttonPost!: ElementRef<any>;
  @ViewChild('buttonPaginas') buttonPaginas!: ElementRef<any>;

  constructor(private comentariosService: ComentariosService) {
    this.comentariosService.read_post().subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.comentariosPost = response.response;
        this.comentarios = this.comentariosPost;
      }
    });
    this.comentariosService.read_pag().subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.comentariosPaginas = response.response;
      }
    });
  }

  toggleButton(): void {
    const postElement = this.buttonPost.nativeElement;
    const paginasElement = this.buttonPaginas.nativeElement;

    postElement.classList.toggle('active');
    paginasElement.classList.toggle('active');

    this.selecionarTodosComentarios(false);

    this.isPostComments = !this.isPostComments;
    this.FilterComentarios();
  }

  FilterComentarios(): void {
    if (this.isPostComments) {
      this.comentarios = this.comentariosPost;
      return;
    }
    this.comentarios = this.comentariosPaginas;
  }

  deleteComentario(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID do comentário é indefinido');
      return;
    }

    const confirmationMessage = 'Você tem certeza que deseja excluir este comentário?';

    if (confirm(confirmationMessage)) {
      if (this.isPostComments) {
        this.comentariosService.delete_post(id).subscribe((response: any) => {
          if (response.success) {
            this.comentarios = this.comentarios.filter(post => post.id !== id);
            alert('Comentário excluído com sucesso');
          } else {
            console.error('Falha na exclusão do comentário', response.message);
            alert('Erro ao excluir comentário: ' + response.message);
          }
        });
        return;
      }
      this.comentariosService.delete_pag(id).subscribe((response: any) => {
        if (response.success) {
          this.comentarios = this.comentarios.filter(pagina => pagina.id !== id);
          alert('Comentário excluído com sucesso');
        } else {
          console.error('Falha na exclusão do comentário', response.message);
          alert('Erro ao excluir comentário: ' + response.message);
        }
      });
    }
  }
}
