import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarAdminComponent } from '../components/public/sidebar-admin/sidebar-admin.component';

interface Post {
  id: number;
  title: string;
  image: string;
  category: string; 
}

@Component({
  selector: 'app-blog-posts-admin',
  standalone: true,
  imports: [NgFor, FormsModule, SidebarAdminComponent],
  templateUrl: './blog-posts-admin.component.html',
  styleUrls: ['./blog-posts-admin.component.scss']
})
export class BlogPostsAdminComponent implements OnInit {
  posts: Post[] = [
    { id: 1, title: 'Título do Post 1', image: 'https://via.placeholder.com/300x200', category: 'Receitas' },
    { id: 2, title: 'Título do Post 2', image: 'https://via.placeholder.com/300x200', category: 'Produtividade' },
    { id: 3, title: 'Título do Post 3', image: 'https://via.placeholder.com/300x200', category: 'Tecnologia' },
    { id: 4, title: 'Título do Post 4', image: 'https://via.placeholder.com/300x200', category: 'Tecnologia' },
    { id: 5, title: 'Título do Post 5', image: 'https://via.placeholder.com/300x200', category: 'Tecnologia' },
    { id: 6, title: 'Título do Post 6', image: 'https://via.placeholder.com/300x200', category: 'Tecnologia' },
  ];

  categories = ['Receitas', 'Produtividade', 'Tecnologia', 'Vida Saudável'];
  selectedCategory = '';
  filteredPosts = this.posts;

  ngOnInit() {
    this.filteredPosts = this.posts;
  }

  filterPostsByCategory() {
    if (this.selectedCategory) {
      this.filteredPosts = this.posts.filter(post => post.category === this.selectedCategory);
    } else {
      this.filteredPosts = this.posts;
    }
  }
}
