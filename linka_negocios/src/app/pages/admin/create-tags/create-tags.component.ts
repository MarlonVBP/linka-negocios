import { Component, computed, inject, model, OnInit, signal } from '@angular/core';
import { MatChip, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { TagsService } from '../../../services/tags.service';
import { PostsService } from '../../../services/posts.service';
import { TagsPostService } from '../../../services/tags-post.service';
import { environment } from '../../../../environments/environment';
import { Post } from '../../../models/post';
import { SidebarAdminComponent } from "../../../components/public/sidebar-admin/sidebar-admin.component";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-tags',
  standalone: true,
  imports: [
    SidebarAdminComponent, CommonModule, MatFormFieldModule, MatChipsModule, MatIconModule, MatAutocompleteModule, FormsModule
  ],
  templateUrl: './create-tags.component.html',
  styleUrls: ['./create-tags.component.scss']
})
export class CreateTagsComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentformTag = model('');
  formTags = signal<string[]>([]);
  allformTags: string[] = [];
  readonly filteredformTags = computed(() => {
    const currentformTag = this.currentformTag().toLowerCase();
    return currentformTag
      ? this.allformTags.filter(formTag => formTag.toLowerCase().includes(currentformTag))
      : this.allformTags.slice();
  });

  readonly announcer = inject(LiveAnnouncer);
  selectedTags: string = '';
  tags: any[] = [];
  filteredPosts: Post[] = [];
  posts: Post[] = [];
  isModalOpen: boolean = false;
  isModalEditOpen: boolean = false;
  newTag: any = {};
  apiUrl = environment.apiUrl + '/public/posts/';
  postId?: number;

  constructor(
    private tagsService: TagsService,
    private postsService: PostsService,
    private tagsPostsService: TagsPostService
  ) { }

  ngOnInit(): void {
    this.loadTags();
    this.loadPosts();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.formTags.update(formTags => [...formTags, value]);
    }
    this.currentformTag.set('');
  }

  remove(formTag: string): void {
    this.formTags.update(formTags => {
      const index = formTags.indexOf(formTag);
      if (index < 0) return formTags;
      const updatedTags = formTags.slice();
      updatedTags.splice(index, 1);
      this.announcer.announce(`Removed ${formTag}`);
      return updatedTags;
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.formTags.update(formTags => [...formTags, event.option.viewValue]);
    this.currentformTag.set('');
    event.option.deselect();
  }

  salvarTags() {
    if (this.postId === undefined) {
      console.error('ID do post é indefinido');
      return;
    }

    const tagNames = this.formTags();
    const tagNameToIdMap = new Map(this.tags.map(tag => [tag.nome, tag.id]));

    const tagIdsToSave = tagNames.map(tagName => tagNameToIdMap.get(tagName)).filter(id => id !== undefined);

    const payload = { postagem_id: this.postId, tag_id: tagIdsToSave };

    this.tagsPostsService.create(payload).subscribe((response: any) => {
      if (response.success) {
        alert('Tags salvas com sucesso');
        this.loadTags();
        this.closeModalEdit();
      } else {
        console.error('Erro ao salvar tags:', response.message);
        alert('Erro ao salvar tags: ' + response.message);
      }
    }, error => {
      console.error('Erro ao comunicar com a API', error);
      alert('Erro ao comunicar com a API: ' + error.message);
    });
  }

  loadTags() {
    this.tagsService.read().subscribe(
      (response: any) => {
        if (response.success) {
          this.tags = response.response;
          this.allformTags = this.tags.map(tag => tag.nome);
        } else {
          console.error('Erro ao carregar tags:', response.message);
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
      },
      (error: any) => {
        console.error('Erro ao carregar posts:', error);
      }
    );
  }

  filterPostsByTags() {
    if (this.selectedTags) {
      this.filteredPosts = this.posts.filter(post => post.categoria_nome === this.selectedTags);
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

  openModalEdit(id: number | undefined) {
    this.isModalEditOpen = true;
    this.postId = id;

    this.tagsPostsService.read(id).subscribe((response: any) => {
      if (response.success) {
        const tags = response.response.map((tag: any) => tag.nome);
        this.formTags.update(() => tags); // Atualize o Signal com uma função
      } else {
        console.error('Erro ao carregar tags do post:', response.message);
      }
    });
  }

  closeModalEdit() {
    this.isModalEditOpen = false;
  }

  addTag() {
    this.tagsService.create(this.newTag).subscribe((response: any) => {
      if (response.success) {
        this.loadTags();
        this.closeModal();
        this.newTag = { nome: '' };
      } else {
        console.error('Erro ao criar a tag:', response.message);
      }
    });
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
