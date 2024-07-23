import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { NgIf } from '@angular/common';
import { CategoriasService } from '../../../services/categorias.service';

@Component({
  selector: 'app-blog-posts-admin',
  standalone: true,
  imports: [NgFor, FormsModule, SidebarAdminComponent, NgIf],
  templateUrl: './blog-posts-admin.component.html',
  styleUrls: ['./blog-posts-admin.component.scss']
})
export class BlogPostsAdminComponent implements OnInit {
  posts: any[] = [
    { id: 1, title: 'Título do Post 1', image: 'https://via.placeholder.com/300x200', category: 'Receitas' },
    { id: 2, title: 'Título do Post 2', image: 'https://via.placeholder.com/300x200', category: 'Produtividade' },
    { id: 3, title: 'Título do Post 3', image: 'https://via.placeholder.com/300x200', category: 'Tecnologia' },
    { id: 4, title: 'Título do Post 4', image: 'https://via.placeholder.com/300x200', category: 'Tecnologia' },
    { id: 5, title: 'Título do Post 5', image: 'https://via.placeholder.com/300x200', category: 'Tecnologia' },
    { id: 6, title: 'Título do Post 6', image: 'https://via.placeholder.com/300x200', category: 'Saúde' },
  ];

  categories: any[] = [];
  selectedCategory = '';
  filteredPosts = this.posts;

  isModalOpen = false;
  newCategory = { nome: '', descricao: '' };

  constructor(private categoriasService: CategoriasService) { }

  ngOnInit() {
    this.loadCategories();
    this.filteredPosts = this.posts;
  }

  loadCategories() {
    this.categoriasService.selectCategories().subscribe(
      (response: any) => {
        if (response.success) {
          this.categories = response.data;
        } else {
          console.error('Erro ao carregar categorias:', response.message);
        }
      },
      (error: any) => {
        console.error('Erro no servidor:', error);
      }
    );
  }

  filterPostsByCategory() {
    if (this.selectedCategory) {
      this.filteredPosts = this.posts.filter(post => post.category === this.selectedCategory);
    } else {
      this.filteredPosts = this.posts;
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addCategory() {
    this.categoriasService.createCategory(this.newCategory).subscribe(
      (response: any) => {
        if (response.success) {
          this.categories.push({ nome: this.newCategory.nome, descricao: this.newCategory.descricao });
          this.newCategory = { nome: '', descricao: '' };
          this.closeModal();
        } else {
          console.error('Erro ao criar categoria:', response.message);
        }
      },
      (error: any) => {
        console.error('Erro no servidor:', error);
      }
    );
  }
}
