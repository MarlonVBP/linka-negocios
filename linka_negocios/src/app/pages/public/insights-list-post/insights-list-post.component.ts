import { Component, inject, Output, EventEmitter, ElementRef, ViewChild, OnInit } from '@angular/core';
import { InsightsSidebarComponent } from '../../../components/public/insights-sidebar/insights-sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../../services/posts.service';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { ComentariosService } from '../../../services/comentarios.service';
import { FormBuilder } from '@angular/forms';
import { Comentario } from '../../../models/comentario';
import { ApiResponse } from '../../../models/api-response';
import { MatDialog } from '@angular/material/dialog';
import { ModalAvaliacoesComponent } from '../../../components/public/modal-avaliacoes/modal-avaliacoes.component';

@Component({
  selector: 'app-insights-list-post',
  standalone: true,
  imports: [InsightsSidebarComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './insights-list-post.component.html',
  styleUrls: ['./insights-list-post.component.scss']
})

export class InsightsListPostComponent implements OnInit {
  @ViewChild('messageRating') messageRatingRef!: ElementRef<HTMLSpanElement>;
  post: any;

  postagem_id: number = 0;

  comentarios: any[] = [];

  stars: boolean[] = Array(5).fill(false);
  rating = 0;
  hoverState = 0;
  rating_post: string = '';

  comentariosForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nome: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    conteudo: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(500)]),
    profissao: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]),
  });

  constructor(
    private postsService: PostsService,
    private comentariosService: ComentariosService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.comentariosForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      conteudo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(200)]],
      profissao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
    });
  }

  ngOnInit(): void {
    this.loadPost();
  }

  openModal(): void{
    this.dialog.open(ModalAvaliacoesComponent, {
      minWidth: '70vw',
      height: '70vh',
      panelClass: 'custom-dialog-container',
      data: this.comentarios
    })
  }

  loadPost(): void {
    this.route.paramMap.subscribe(params => {
      const postId = +params.get('id')!;
      console.log('ID do post:', postId);

      this.postagem_id = postId;

      if (postId) {
        this.postsService.getPostById(postId).subscribe((response: any) => {
          this.post = response.data[0];
          console.log('Post carregado:', this.post);
        },
        );

        this.comentariosService.read_post(this.postagem_id).subscribe((response: any) => {
          this.comentarios = response.response; // Ajustado para atribuir diretamente à array
          console.log(response.response)
        });
      } else {
        console.error('ID do post não encontrado na URL');
      }
    });
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
      id: this.postagem_id,
      email: this.comentariosForm.value.email,
      nome: this.comentariosForm.value.nome,
      conteudo: this.comentariosForm.value.conteudo,
      profissao: this.comentariosForm.value.profissao,
      avaliacao: this.rating,
    };

    this.comentariosService.create_post(comentario).subscribe(
      () => {
        this.comentariosService.read_post(this.postagem_id).subscribe((response: any) => {
          this.comentarios = response.response; // Ajustado para atribuir diretamente à array
        });
      },
      (error) => {
        console.error('Erro ao criar comentário:', error);
      }
    );


    // this.comentariosForm.reset();
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

  dataAtualFormatada(): string {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }
}
