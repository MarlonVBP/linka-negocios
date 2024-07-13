import { Component, ViewChild, ElementRef } from '@angular/core';
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

  fileName: string | null = null;
  fileType: string | null = null;
  fileSize: string | null = null;
  fontSizes: number[] = Array.from({length: 21}, (_, i) => i + 10); 

  constructor() {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileName = file.name;
      this.fileType = file.type.split('/')[1].toUpperCase();
      this.fileSize = (file.size / 1024 / 1024).toFixed(2) + ' MB';
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
  }

  format(command: string, value: string = ''): void {
    document.execCommand(command, false, value);
  }

  insertLink(): void {
    const url = prompt('Enter the URL');
    if (url) {
      this.format('createLink', url);
    }
  }

  insertImage(): void {
    const url = prompt('Enter the image URL');
    if (url) {
      this.format('insertImage', url);
    }
  }

  changeTextColor(): void {
    const color = prompt('Enter the color');
    if (color) {
      this.format('foreColor', color);
    }
  }

  changeBackgroundColor(): void {
    const color = prompt('Enter the background color');
    if (color) {
      this.format('backColor', color);
    }
  }

  changeFontSize(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const size = select.value;
    document.execCommand('fontSize', false, size);
  }
}
