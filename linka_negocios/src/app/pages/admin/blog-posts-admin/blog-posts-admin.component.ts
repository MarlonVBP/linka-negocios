import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { CategoriasService } from '../../../services/categorias.service';
import { PostsService } from '../../../services/posts.service';  // Adicione esta linha
import { Post } from '../../../models/post';  // Adicione esta linha

@Component({
  selector: 'app-blog-posts-admin',
  standalone: true,
  imports: [NgFor, FormsModule, SidebarAdminComponent, NgIf],
  templateUrl: './blog-posts-admin.component.html',
  styleUrls: ['./blog-posts-admin.component.scss']
})
export class BlogPostsAdminComponent implements OnInit {
  posts: Post[] = [];
  categories: any[] = [];
  selectedCategory = '';
  filteredPosts: Post[] = [];
  isModalOpen = false;
  isEditModalOpen = false;  // Adicione esta linha
  newCategory = { nome: '', descricao: '' };
  editPostData: any = {};  // Adicione esta linha
  selectedImage: File | null = null;  // Adicione esta linha

  constructor(private categoriasService: CategoriasService, private postsService: PostsService) { }

  ngOnInit() {
    this.loadCategories();
    this.loadPosts();
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

  loadPosts() {
    this.postsService.getPosts().subscribe(
      (response: Post[]) => {
        this.posts = response;
        this.filteredPosts = this.posts;
      },
      (error: any) => {
        console.error('Erro ao carregar posts:', error);
      }
    );
  }

  filterPostsByCategory() {
    if (this.selectedCategory) {
      this.filteredPosts = this.posts.filter(post => post.categoria_nome === this.selectedCategory);
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

  openEditModal(post: Post) {
    this.editPostData = { ...post };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.editPostData = {};
    this.selectedImage = null;
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  updatePost() {
    const formData = new FormData();
    formData.append('id', this.editPostData.id);
    formData.append('title', this.editPostData.titulo);
    formData.append('content', this.editPostData.conteudo);
    formData.append('category_id', this.editPostData.categoria_id);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
    formData.append('email', localStorage.getItem('email') || '');

    this.postsService.updatePost(formData).subscribe(
      (response: any) => {
        if (response.success) {
          this.loadPosts();
          this.closeEditModal();
        } else {
          console.error('Erro ao atualizar post:', response.message);
        }
      },
      (error: any) => {
        console.error('Erro no servidor:', error);
      }
    );
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

  deletePost(postId: number | undefined): void {
    if (postId === undefined) {
      console.error('ID da postagem é indefinido');
      return;
    }
  
    if (confirm('Você tem certeza que deseja excluir esta postagem?')) {
      this.postsService.deletePost(postId).subscribe(response => {
        if (response.success) {
          this.posts = this.posts.filter(post => post.id !== postId);
          this.filteredPosts = this.filteredPosts.filter(post => post.id !== postId);
          alert('Postagem excluída com sucesso');
        } else {
          console.error('Falha na exclusão da postagem', response.message);
          alert('Erro ao excluir postagem: ' + response.message);
        }
      }, error => {
        console.error('Erro ao comunicar com a API', error);
        alert('Erro ao comunicar com a API: ' + error.message);
      });
    }
  }
  
  
}
