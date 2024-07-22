import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { SidebarAdminComponent } from '../components/public/sidebar-admin/sidebar-admin.component';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SidebarAdminComponent
  ],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  createPostForm: FormGroup;
  fileName: string | null = null;
  fileType: string | null = null;
  fileSize: string | null = null;
  fontSizes: number[] = Array.from({ length: 7 }, (_, i) => i + 1);
  formErrors: string[] = [];

  constructor(private fb: FormBuilder) {
    this.createPostForm = this.fb.group({
      title: ['', Validators.required],
      image: [null],
      content: ['', Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;
      this.fileType = file.type.split('/')[1].toUpperCase();
      this.fileSize = (file.size / 1024 / 1024).toFixed(2) + ' MB';
      this.createPostForm.patchValue({ image: file });
    }
  }

  onContentChange(): void {
    const contentDiv = document.getElementById('content');
    if (contentDiv && this.createPostForm.get('content')) {
      const content = contentDiv.innerText || contentDiv.textContent || '';
      this.createPostForm.patchValue({ content });
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  removeFile(): void {
    this.fileName = null;
    this.fileType = null;
    this.fileSize = null;
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
    const url = prompt('Enter the image URL');
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
    const selectElement = event.target as HTMLSelectElement;
    const fontSize = selectElement.value;
  
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedNodes = range.cloneContents().childNodes;
      selectedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          (node as HTMLElement).classList.forEach((className) => {
            if (className.startsWith('font-size-')) {
              (node as HTMLElement).classList.remove(className);
            }
          });
          (node as HTMLElement).classList.add(`font-size-${fontSize}`);
        }
      });
    }
  
    document.execCommand('fontSize', false, fontSize);
  }
  

  onSubmit(): void {
    this.formErrors = [];
    console.log('Form Value:', this.createPostForm.value);
    if (this.createPostForm.valid) {
      const postData = this.createPostForm.value;
      console.log('Post Data:', postData);
    } else {
      this.logValidationErrors(this.createPostForm);
      console.log('Formulário inválido', this.formErrors);
    }
  }

  logValidationErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control && control.invalid && (control.dirty || control.touched)) {
        const errorMessages = this.getErrorMessage(key, control.errors);
        this.formErrors.push(...errorMessages);
      }
    });
  }

  getErrorMessage(controlName: string, errors: any): string[] {
    const messages: string[] = [];
    if (errors) {
      if (errors.required) {
        messages.push(`O campo ${controlName} é obrigatório.`);
      }
    }
    return messages;
  }

  cancel(): void {
    this.createPostForm.reset();
  }
}
