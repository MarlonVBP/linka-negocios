import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../../services/posts.service';
import { InsightsSidebarComponent } from '../../../components/public/insights-sidebar/insights-sidebar.component';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { ComentariosService } from '../../../services/comentarios.service';
import { FormBuilder } from '@angular/forms';


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
      id: '1',
      email: 'maria.anjos@linka.negocios.com',
      rating: '&#9733; &#9733; &#9733; &#9733; &#9733;',
      nome: 'Maria Anjos',
      data: 'Oct 18, 2024',
      conteudo: 'Towering performance by Matt Damon as a troubled working class who needs to address his creative genius elevates this drama way above its therapeutic approach, resulting in a zeitgeist film that may touch chord with young viewers the way The Graduate did'
    },
  ];

  comentariosForm: FormGroup;
  stars: boolean[] = Array(5).fill(false);
  rating = 0;
  hoverState = 3;
  rating_post: string = '';

  constructor(
    private postsService: PostsService,
    private comentariosService: ComentariosService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.comentariosForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nome: ['', Validators.required],
      conteudo: ['', Validators.required]
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

    this.comentarios.push({
      id: (this.comentarios.length + 1).toString(), 
      email: this.comentariosForm.value.email ?? '',
      rating: this.rating_post ?? '',
      nome: this.comentariosForm.value.nome ?? '',
      data: this.dataAtualFormatada(),
      conteudo: this.comentariosForm.value.conteudo ?? '',
    });

    this.comentariosService.submitApplication(
      this.comentariosForm.value.email ?? '',
      this.comentariosForm.value.nome ?? '',
      this.comentariosForm.value.conteudo ?? ''
    ).subscribe(
      () => console.log('Comentário enviado com sucesso!'),
      (error: any) => console.error('Erro ao enviar comentário:', error)
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
