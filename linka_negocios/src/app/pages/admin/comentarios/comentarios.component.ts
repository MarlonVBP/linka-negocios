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

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [SidebarAdminComponent, CapitalizeFirstPipe, CommonModule, AvaliacoesComponent],
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit, OnDestroy, AfterViewInit {

  ngAfterViewInit(): void {
    // Inicializar a animação após a visualização do componente
    lottie.loadAnimation({
      container: document.getElementById('animationContainer') as HTMLElement, // Seletor do contêiner da animação
      renderer: 'svg', // O tipo de renderizador, pode ser 'svg', 'canvas' ou 'html'
      loop: true, // Se a animação deve se repetir
      autoplay: true, // Se a animação deve iniciar automaticamente
      path: 'images/animations/animation1.json' // Caminho para o arquivo JSON da animação
    });
  }
  @ViewChild('buttonPost') buttonPost!: ElementRef;
  @ViewChild('buttonPaginas') buttonPaginas!: ElementRef;

  comentarios: Comentario[] = [];
  private scrollSubscription: Subscription = new Subscription();
  private isPostComments: boolean = true; // Estado para verificar o tipo de comentários exibidos

  constructor(private comentariosService: ComentariosService) { }

  ngOnInit(): void {
    this.loadComentarios();
    this.setupScrollListener();
  }

  ngOnDestroy(): void {
    // Limpa a assinatura do evento de scroll
    this.scrollSubscription.unsubscribe();
  }

  loadComentarios(): void {
    this.isPostComments = true; // Inicialmente carrega comentários de posts
    this.comentariosService.read_post().subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.comentarios = response.response;
        this.markVisibleCommentsAsRead(); // Marca os comentários visíveis como lidos
      }
    });
    this.isPostComments = false;
    if (this.comentarios.length == 0) {
      this.comentariosService.read_pag().subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          this.comentarios = response.response;
          this.markVisibleCommentsAsRead(); // Marca os comentários visíveis como lidos
          this.toggleButton();
        }
      });
    }
  }

  setupScrollListener(): void {
    // Monitorar eventos de scroll
    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(throttleTime(200)) // Limita a frequência dos eventos de scroll
      .subscribe(() => this.checkVisibleComments());
  }

  checkVisibleComments(): void {
    const visibleCommentIds: number[] = [];

    this.comentarios.forEach((comment: Comentario) => {
      const element = document.getElementById(`comment-${comment.id}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom >= 0;

        if (inView && !comment.viewed) {
          visibleCommentIds.push(comment.id);
          comment.viewed = true; // Marca como visto
        }
      }
    });

    if (visibleCommentIds.length > 0) {
      this.markCommentsAsRead(visibleCommentIds);
    }
  }

  markCommentsAsRead(ids: number[]): void {
    if (this.isPostComments) {
      this.comentariosService.mark_comments_as_read_post(ids).subscribe(response => {
        console.log('Comentários marcados como vistos com sucesso');
      });
      return;
    }
    this.comentariosService.mark_comments_as_read_pag(ids).subscribe(response => {
      console.log('Comentários marcados como vistos com sucesso');
    });
  }

  markVisibleCommentsAsRead(): void {
    // Inicialmente, marca todos os comentários visíveis ao carregar
    this.checkVisibleComments();
  }

  submitComentariosForm(id: number): void {
    console.log(id);
    const inputElement = document.getElementById(`resposta-${id}`) as HTMLInputElement;
    const resposta = inputElement ? inputElement.value : null;

    // this.comentariosService.create().subscribe(() => {
    //   this.comentariosService.read().subscribe((response: any) => {
    //     console.log(response);
    //     this.comentarios = response.response;
    //   })
    // })
  }

  toggleButton(): void {
    const postElement = this.buttonPost.nativeElement;
    const paginasElement = this.buttonPaginas.nativeElement;

    postElement.classList.toggle('active');
    paginasElement.classList.toggle('active');
  }

  FilterComentarios(bool: boolean): void {
    this.isPostComments = bool; // Atualiza o estado com base na seleção
    if (bool) {
      this.comentariosService.read_post().subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          this.comentarios = response.response;
          // this.markVisibleCommentsAsRead(); // Marca os comentários visíveis como lidos
          return;
        }
        this.comentarios = [];
      });
    } else {
      this.comentariosService.read_pag().subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          this.comentarios = response.response;
          // this.markVisibleCommentsAsRead(); // Marca os comentários visíveis como lidos
          return;
        }
        this.comentarios = [];
      });
    }
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
