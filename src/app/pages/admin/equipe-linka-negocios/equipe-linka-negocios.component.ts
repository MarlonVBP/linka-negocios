import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EquipeLinkaNegociosService } from '../../../services/equipe-linka-negocios.service';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-equipe-linka-negocios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarAdminComponent, MatIconModule],
  templateUrl: './equipe-linka-negocios.component.html',
  styleUrl: './equipe-linka-negocios.component.scss'
})

export class EquipeLinkaNegociosComponent implements OnInit {
  casosSucesso: any[] = [];
  isModalOpen = false;
  isEditModalOpen = false;
  casoForm: FormGroup;
  editCasoForm: FormGroup;
  editingCasoId: number | null = null;

  constructor(private fb: FormBuilder, private equipe_linka_negociosSevice: EquipeLinkaNegociosService) {
    this.casoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      imagem: ['', Validators.required]
    });

    this.editCasoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      imagem: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadEquipe();
  }

  loadEquipe(): void {
    this.equipe_linka_negociosSevice.read().subscribe(
      (response: any) => {
        if (response.success) {
          this.casosSucesso = response.equipe_linka_negocios;
        } else {
          console.error('Nenhum caso de sucesso encontrado.');
        }
      },
      (error) => {
        console.error('Erro ao listar casos:', error);
      }
    );
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openEditModal(caso: any) {
    this.editingCasoId = caso.id;

    this.editCasoForm.patchValue({
      nome: caso.nome,
      descricao: caso.descricao,
      imagem: caso.imagem
    });
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  onSubmit() {
    if (this.casoForm.valid) {
      this.equipe_linka_negociosSevice.create(this.casoForm.value).subscribe(response => {
        console.log('Caso de sucesso cadastrado com sucesso:', response);
        this.loadEquipe();
        this.closeModal();
      });
    }
  }

  onEditSubmit() {
    if (this.editCasoForm.valid && this.editingCasoId !== null) {
      const updatedCaso = {
        id: this.editingCasoId,
        ...this.editCasoForm.value
      };

      this.equipe_linka_negociosSevice.update(updatedCaso).subscribe(response => {
        console.log('Caso de sucesso atualizado com sucesso:', response);
        this.loadEquipe();
        this.closeEditModal();
      });
    }
  }

  deleteCaso(id: number) {
    if (confirm('Você tem certeza que deseja excluir este caso de sucesso?')) {
      this.equipe_linka_negociosSevice.delete(id).subscribe(() => {
        console.log('Caso de sucesso excluído com sucesso:');
        window.location.reload();
      });        
    }
  }

}
