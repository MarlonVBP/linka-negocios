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

@Component({
  selector: 'app-insights-list-post',
  standalone: true,
  imports: [InsightsSidebarComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './insights-list-post.component.html',
  styleUrls: ['./insights-list-post.component.scss']
})

export class InsightsListPostComponent implements OnInit {
  post: any;
  comentarios: any[] = [
    {
      id: '1',
      email: 'marlon.passos@linka.negocios.com',
      rating: '&#9733; &#9733; &#9733; &#9733; &#9734;',
      nome: 'Marlon Passos',
      data: 'Oct 17, 2024',
      conteudo: 'Towering performance by Matt Damon as a troubled working class who needs to address his creative genius elevates this drama way above its therapeutic approach, resulting in a zeitgeist film that may touch chord with young viewers the way The Graduate did'
    },
    {
      id: '2',
      email: 'maria.anjos@linka.negocios.com',
      rating: '&#9733; &#9733; &#9733; &#9733; &#9733;',
      nome: 'Maria Anjos',
      data: 'Oct 18, 2024',
      conteudo: 'Towering performance by Matt Damon as a troubled working class who needs to address his creative genius elevates this drama way above its therapeutic approach, resulting in a zeitgeist film that may touch chord with young viewers the way The Graduate did'
    },
  ];

  stars: boolean[] = Array(5).fill(false);
  rating = 0;
  hoverState = 0;
  rating_post: string = '';

  comentariosForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nome: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    conteudo: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(200)]),
    profissao: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
  });

  constructor(
    private postsService: PostsService,
    private comentariosService: ComentariosService,
    private fb: FormBuilder,
    private route: ActivatedRoute
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

  loadPost(): void {
    this.route.paramMap.subscribe(params => {
      const postId = +params.get('id')!;
      console.log('ID do post:', postId);

      if (postId) {
        this.postsService.getPostById(postId).subscribe(
          (response: any) => {
            const posts = response.data;
            this.post = posts.find((p: any) => p.id === postId);
            console.log('Post carregado:', this.post);

            // Salvar o post no Local Storage
            if (this.post) {
              localStorage.setItem('post', JSON.stringify(this.post));
            }
          },
          (error: any) => {
            console.error('Erro ao carregar o post:', error);
          }
        );
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
      console.error('Rating inválido');
      return;
    }

    const comentario = {
      id: (this.comentarios.length + 1).toString(),
      email: this.comentariosForm.value.email,
      nome: this.comentariosForm.value.nome,
      conteudo: this.comentariosForm.value.conteudo,
      profissao: this.comentariosForm.value.profissao,
      rating: this.rating_post,
      data: this.dataAtualFormatada()
    };

    this.comentarios.push(comentario);

    this.comentariosService.create(comentario).subscribe(
      (data: any) => {
        console.log('Comentário enviado com sucesso!', data);
      },
      (error: any) => {
        console.error('Erro ao enviar comentário:', error);
      }
    );

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

  dataAtualFormatada(): string {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }
}
