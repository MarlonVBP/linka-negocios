import { Component, OnInit } from '@angular/core';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { identity } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { Post } from '../../../models/post';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [SidebarClienteComponent, FooterComponent, CommonModule, RouterModule],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.scss'
})
export class InsightsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts().subscribe(
      (data) => {
        this.posts = data;
        console.log(this.posts)
      },
      (error) => {
        console.error('Erro ao buscar postagens', error);
      }
    );
  }

  maxLength = 250;

  truncateText(text: string): string {
    // Remove todas as tags <h2> e </h2> e quebras de linha
    const cleanedText = text.replace(/<h2>/gi, '<strong>').replace(/<\/h2>/gi, '</strong>').replace(/\n/g, '<br>');

    console.log(cleanedText.length > this.maxLength ? cleanedText.substring(0, this.maxLength) + '...' : cleanedText);
    // Trunca o texto se exceder o comprimento máximo
    return cleanedText.length > this.maxLength ? cleanedText.substring(0, this.maxLength) + '...' : cleanedText;
  }


  savePost(post: Post) {
    localStorage.setItem('selectedPost', JSON.stringify(post));
  }
}
