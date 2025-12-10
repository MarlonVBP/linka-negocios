import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { ComentariosService } from '../../../services/comentarios.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Comentario } from '../../../models/comentario';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [SidebarAdminComponent, CommonModule, MatCheckboxModule],
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})
export class ComentariosComponent implements AfterViewInit {
  @ViewChild('animacaoContainer') container!: ElementRef;

  constructor(
    private comentariosService: ComentariosService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.comentariosService.read_post().subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.comentariosPost = response.response;
        this.comentarios = this.comentariosPost;
      }
    });
    this.comentariosService.read_prod().subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        response.response.forEach((comentario: any) => {
          this.comentariosPost.push(comentario);
        });

        console.log(this.comentariosPost);

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

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.carregarAnimacao();
    }
  }

  async carregarAnimacao() {
    const lottie = (await import('lottie-web')).default;

    lottie.loadAnimation({
      container: this.container.nativeElement,
      path: 'assets/images/animations/animation1.json', // seu caminho
      renderer: 'svg',
      loop: true,
      autoplay: true,
    });
  }

  comentariosVistos: number[] = [];
  comentariosProdutosVistos: number[] = [];
  selecionarTodos: boolean = false;

  marcarComoVisto(number: number, produto?: any) {
    if (produto) {
      const index = this.comentariosProdutosVistos.indexOf(number);

      if (!this.comentariosProdutosVistos.includes(number)) {
        this.comentariosProdutosVistos.push(number);
        console.log(this.comentariosProdutosVistos);
        return;
      }
      this.comentariosProdutosVistos.splice(index, 1);
      console.log(this.comentariosProdutosVistos);
      return;
    }

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
      if (this.isPostComments) {
        this.comentarios.map((comentario: any) => {
          if (comentario.postagem_id) {
            console.log('post');
            this.comentariosVistos.push(comentario.id);
            return;
          }
          this.comentariosProdutosVistos.push(comentario.id);
        });
        console.log(this.comentariosVistos);
        console.log(this.comentariosProdutosVistos);
        return;
      }
      this.comentariosVistos = this.comentarios.map(
        (comentario) => comentario.id
      );
      console.log(this.comentariosVistos);
      return;
    }
    this.comentariosVistos = [];
    this.comentariosProdutosVistos = [];
    console.log(this.comentariosVistos);
  }

  marcarComentarios(tipo: boolean, ids: number[], ids_produtos: number[]) {
    if (tipo) {
      if (this.comentariosProdutosVistos.length) {
        this.comentariosService
          .mark_comments_as_read_prod(ids_produtos)
          .subscribe((response: any) => {
            console.log(response);
            if (response.success) {
              this.comentariosService.read_prod().subscribe();
            }
          });
      }
      if (this.comentariosVistos.length) {
        this.comentariosService
          .mark_comments_as_read_post(ids)
          .subscribe((response: any) => {
            console.log(response);
            if (response.success) {
              this.comentariosService.read_post().subscribe();
            }
          });
      }

      return;
    }
    this.comentariosService
      .mark_comments_as_read_pag(ids)
      .subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          this.comentariosService.read_pag().subscribe();
        }
      });
  }

  comentarios: Comentario[] = [];
  comentariosPost: Comentario[] = [];
  comentariosProd: Comentario[] = [];
  comentariosPaginas: Comentario[] = [];
  isPostComments: boolean = true; // Estado para verificar o tipo de comentários exibidos

  @ViewChild('buttonPost') buttonPost!: ElementRef<any>;
  @ViewChild('buttonPaginas') buttonPaginas!: ElementRef<any>;

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

    const confirmationMessage =
      'Você tem certeza que deseja excluir este comentário?';

    if (confirm(confirmationMessage)) {
      if (this.isPostComments) {
        this.comentariosService.delete_post(id).subscribe((response: any) => {
          if (response.success) {
            this.comentarios = this.comentarios.filter(
              (post) => post.id !== id
            );
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
          this.comentarios = this.comentarios.filter(
            (pagina) => pagina.id !== id
          );
          alert('Comentário excluído com sucesso');
        } else {
          console.error('Falha na exclusão do comentário', response.message);
          alert('Erro ao excluir comentário: ' + response.message);
        }
      });
    }
  }
}
