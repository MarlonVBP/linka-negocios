import { Component, OnInit } from '@angular/core';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { Post } from '../../../models/post';
import { environment } from '../../../../environments/environment';
import { SpinnerComponent } from "../../../components/public/spinner/spinner.component";

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [SidebarClienteComponent, FooterComponent, CommonModule, RouterModule, SpinnerComponent],
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnInit {
  posts: Post[] = [];
  maxLength = 250;
  apiUrl = environment.apiUrl + '/public/posts/';
  load_spinner: boolean = false;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.load_spinner = true;
    this.postsService.getPosts().subscribe(
      (data: Post[]) => {
        this.posts = data.map(post => ({
          ...post,
          conteudo: this.truncateText(post.conteudo)
        }));
        this.load_spinner = false;
      },
      (error) => {
        console.error('Erro ao buscar postagens', error);
      }
    );
  }

  truncateText(text: string): string {
    const plainText = text.replace(/<\/?[^>]+(>|$)/g, "");

    return plainText.length > this.maxLength ? plainText.substring(0, this.maxLength) + '...' : plainText;
  }

  savePost(post: Post) {
    localStorage.setItem('selectedPost', JSON.stringify(post));
  }
}
