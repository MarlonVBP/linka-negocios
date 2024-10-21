import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { CategoriasService } from '../../../services/categorias.service';
import { PostsService } from '../../../services/posts.service';
import { Post } from '../../../models/post';
import { ViewChild, ElementRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../../environments/environment';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { TextEllipsisPipe } from '../../../pipes/text-ellipsis.pipe';
import { map, Observable, startWith } from 'rxjs';
import { State } from '../../../models/state';

@Component({
  selector: 'app-blog-posts-admin',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    SidebarAdminComponent,
    NgIf,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    AsyncPipe,
    TextEllipsisPipe
  ],
  templateUrl: './blog-posts-admin.component.html',
  styleUrls: ['./blog-posts-admin.component.scss']
})
export class BlogPostsAdminComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  posts: Post[] = [];
  categories: any[] = [];
  selectedCategory = '';
  filteredPosts: Post[] = [];
  isModalOpen = false;
  isEditModalOpen = false;
  newCategory = { nome: '', descricao: '' };
  editPostData: any = {};
  selectedImage: File | null = null;
  fileName: string | null = null;
  fileType: string | null = null;
  fileSize: string | null = null;
  categoryError: string | null = null;
  fontSizes: number[] = Array.from({ length: 7 }, (_, i) => i + 1);
  apiUrl = environment.apiUrl + '/public/posts/';

  constructor(private categoriasService: CategoriasService, private postsService: PostsService) {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.states.slice())),
    );
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadPosts();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedImage = file;
      this.fileName = file.name;
      this.fileType = file.type;
      this.fileSize = (file.size / 1024).toFixed(2) + ' KB';
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  removeFile(): void {
    this.selectedImage = null;
    this.fileName = null;
    this.fileType = null;
    this.fileSize = null;
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
    this.postsService.getPostsAdmin().subscribe(
      (response: Post[]) => {
        this.posts = response;
        this.filteredPosts = this.posts;
        this.states = this.posts.map(post => ({
          title: post.titulo,
          thumbnail: this.apiUrl + post.url_imagem || ''
        }));

        this.filteredStates = this.stateCtrl.valueChanges.pipe(
          startWith(''),
          map(state => (state ? this._filterStates(state) : this.states.slice())),
        );
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
    console.log('Post selecionado:', post);

    this.categoriasService.selectCategories().subscribe(
      (response: any) => {
        if (response.success) {
          this.categories = response.data;
          this.editPostData = { ...post };
          console.log('editPostData:', this.editPostData);
          this.isEditModalOpen = true;

          setTimeout(() => {
            const editContentDiv = document.getElementById('editContent') as HTMLDivElement;
            if (editContentDiv) {
              editContentDiv.innerHTML = this.editPostData.conteudo || '';
            }
          }, 0);

          this.fileName = post.url_imagem;
        } else {
          console.error('Erro ao carregar categorias:', response.message);
        }
      },
      (error: any) => {
        console.error('Erro no servidor:', error);
      }
    );
  }

  format(command: string, value?: string) {
    document.execCommand(command, false, value || '');
  }

  insertLink() {
    const url = prompt('Digite a URL do link:', 'http://');
    if (url) {
      this.format('createLink', url);
    }
  }

  insertImage() {
    const url = prompt('Digite a URL da imagem:', 'http://');
    if (url) {
      this.format('insertImage', url);
    }
  }

  changeTextColor(event: MouseEvent): void {
    const existingColorPicker = document.querySelector<HTMLInputElement>('#colorPicker');

    if (existingColorPicker) {
      existingColorPicker.remove();
    }

    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.id = 'colorPicker';

    colorPicker.addEventListener('input', (e: Event) => {
      const color = (e.target as HTMLInputElement).value;
      this.format('foreColor', color);
    });

    document.body.appendChild(colorPicker);
    colorPicker.click();
    document.body.removeChild(colorPicker);
  }

  changeFontSize(event: Event): void {
    const size = (event.target as HTMLSelectElement).value;
    this.format('fontSize', size);
  }

  onContentChange() {
    const editContentDiv = document.getElementById('editContent') as HTMLDivElement;
    if (editContentDiv) {
      this.editPostData.conteudo = editContentDiv.innerHTML;
    }
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.editPostData = {};
    this.removeFile();
  }

  updatePost() {
    if (!this.editPostData.categoria_id) {
      this.categoryError = 'Por favor, selecione uma categoria.';
      return;
    }

    console.log(this.editPostData)

    const formData = new FormData();
    formData.append('id', this.editPostData.id);
    formData.append('title', this.editPostData.titulo);
    formData.append('content', this.editPostData.conteudo);
    formData.append('category_id', this.editPostData.categoria_id);
    formData.append('description', this.editPostData.descricao);
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
      }
    );
  }

  addCategory() {
    this.categoriasService.createCategory(this.newCategory).subscribe(
      (response: any) => {
        if (response.success) {
          this.loadCategories();
          this.closeModal();
          this.newCategory = { nome: '', descricao: '' };
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

  stateCtrl = new FormControl('');
  filteredStates: Observable<State[]>;

  states: State[] = [];

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    this.filteredPosts = this.posts.filter(post => post.titulo.toLocaleLowerCase().includes(filterValue))
    return this.states.filter(state => state.title.toLowerCase().includes(filterValue));
  }
}