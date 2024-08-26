import { Component, OnInit } from '@angular/core';
import { SidebarAdminComponent } from "../../../components/public/sidebar-admin/sidebar-admin.component";
import { TagsService } from '../../../services/tags.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-tags',
  standalone: true,
  imports: [SidebarAdminComponent, CommonModule, FormsModule, MatButtonModule],
  templateUrl: './create-tags.component.html',
  styleUrl: './create-tags.component.scss'
})
export class CreateTagsComponent implements OnInit{
constructor( private tagsService: TagsService){

}

tags: any[] = [];
selectedTags: string = ''

ngOnInit(): void {
  this.loadTags();
}

  loadTags() {
    this.tagsService.selectTags().subscribe(
      (response: any) => {
        if (response.success) {
          this.tags = response.response;
          console.log(this.tags)
        } else {
          console.error('Erro ao carregar categorias:', response.message);
        }
      },
      (error: any) => {
        console.error('Erro no servidor:', error);
      }
    );
  }

  filterPostsByTags(){

  }
}
