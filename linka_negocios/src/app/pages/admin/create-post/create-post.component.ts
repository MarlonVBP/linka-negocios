import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostsService } from '../../../services/posts.service';
import { CategoriasService } from '../../../services/categorias.service';
import { SidebarAdminComponent } from "../../../components/public/sidebar-admin/sidebar-admin.component";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, SidebarAdminComponent]
})
export class CreatePostComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  createPostForm: FormGroup;
  currentStep = 1; // Controle do passo atual
  fileName: string | null = null;
  fileType: string | null = null;
  fileSize: string | null = null;
  imageSrc: string | ArrayBuffer | null = null;
  fontSizes: number[] = Array.from({ length: 7 }, (_, i) => i + 1);
  formErrors: string[] = [];
  categories: any[] = [];
  sanitizedContent: SafeHtml = '';

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private categoriasService: CategoriasService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar
  ) {
    this.createPostForm = this.fb.group({
      title: ['', Validators.required],
      image: [null],
      content: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCategories();
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

  nextStep() {
    if (this.currentStep === 1) {
      // Valida a etapa 1 se necessário
      this.currentStep = 2;
    } else if (this.currentStep === 2) {
      // Valida a etapa 2 se necessário
      this.currentStep = 3;
    }
  }

  prevStep() {
    if (this.currentStep === 2) {
      this.currentStep = 1;
    } else if (this.currentStep === 3) {
      this.currentStep = 2;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;
      this.fileType = file.type.split('/')[1].toUpperCase();
      this.fileSize = (file.size / 1024 / 1024).toFixed(2) + ' MB';

      // Exibir imagem selecionada
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);

      this.createPostForm.patchValue({ image: file });
    }
  }

  onContentChange(): void {
    const content = (document.getElementById('content') as HTMLDivElement).innerText;
    this.createPostForm.patchValue({ content: content });
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  removeFile(): void {
    this.fileName = null;
    this.fileType = null;
    this.fileSize = null;
    this.imageSrc = null;
    this.fileInput.nativeElement.value = '';
    this.createPostForm.patchValue({ image: null });
  }

  format(command: string, value: string = ''): void {
    document.execCommand(command, false, value);
  }

  insertLink(): void {
    const url = prompt('Digite a URL');
    if (url) {
      const selectedText = window.getSelection()?.toString().trim() || 'Link';

      const linkElement = document.createElement('a');
      linkElement.href = url;
      linkElement.textContent = selectedText;
      linkElement.target = '_blank';

      linkElement.style.color = 'blue';
      linkElement.style.textDecoration = 'underline';
      linkElement.style.cursor = 'pointer';

      this.insertHtmlElement(linkElement);
    }
  }

  insertHtmlElement(element: HTMLElement) {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(element);
    }
  }

  insertImage(): void {
    const url = prompt('Digite a URL da imagem');
    if (url) {
      this.format('insertImage', url);
    }
  }

  changeTextColor(event: MouseEvent): void {
    const existingColorPicker = document.querySelector('.color-picker');
    if (existingColorPicker) {
      document.body.removeChild(existingColorPicker);
    }

    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.classList.add('color-picker');
    colorPicker.addEventListener('change', (event: Event) => {
      const color = (event.target as HTMLInputElement).value;
      if (color) {
        this.format('foreColor', color);
      }
      document.body.removeChild(colorPicker);
    });

    colorPicker.style.position = 'absolute';
    colorPicker.style.zIndex = '1000';
    colorPicker.style.border = 'none';
    colorPicker.style.padding = '5px';
    colorPicker.style.borderRadius = '5px';
    colorPicker.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    colorPicker.style.cursor = 'pointer';

    const button = event.target as HTMLElement;
    const buttonRect = button.getBoundingClientRect();

    const verticalOffset = 75;
    colorPicker.style.left = `${buttonRect.right}px`;
    colorPicker.style.top = `${buttonRect.top + verticalOffset}px`;

    document.body.appendChild(colorPicker);
    colorPicker.focus();

    event.stopPropagation();
  }

  changeFontSize(event: Event): void {
    const size = (event.target as HTMLSelectElement).value;
    this.format('fontSize', size);
  }

  onSubmit() {
    if (this.createPostForm.valid) {
      const formData = new FormData();
      formData.append('title', this.createPostForm.get('title')?.value);
      formData.append('description', this.createPostForm.get('description')?.value);
      formData.append('content', this.createPostForm.get('content')?.value);
      formData.append('image', this.createPostForm.get('image')?.value);
      formData.append('category_id', this.createPostForm.get('category')?.value);

      this.postsService.createPost(formData).subscribe(
        response => {
          console.log('Post criado com sucesso:', response);
          this.snackBar.open('Post criado com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar-bg']
          });
        },
        error => {
          console.error('Erro ao criar o post:', error);
          this.snackBar.open('Erro ao criar o post!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar-bg']
          });
        }
      );
     } else {
        // Validar campos e mostrar erros
        console.log('Formulário inválido');
        this.formErrors = Object.keys(this.createPostForm.controls).filter(key => this.createPostForm.get(key)?.invalid)
          .map(key => `${key} é obrigatório`);
      }
    }
  }
