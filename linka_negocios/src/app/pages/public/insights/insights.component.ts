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
    const div = document.createElement('div');
    div.innerHTML = text;
    const plainText = div.innerText || div.textContent || '';

    return plainText.length > this.maxLength ? plainText.substring(0, this.maxLength) + '...' : plainText;
  }
  
  

  savePost(post: Post) {
    localStorage.setItem('selectedPost', JSON.stringify(post));
  }
}
