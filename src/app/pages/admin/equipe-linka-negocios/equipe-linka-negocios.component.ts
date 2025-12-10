import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EquipeLinkaNegociosService } from '../../../services/equipe-linka-negocios.service';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-equipe-linka-negocios',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SidebarAdminComponent,
        MatIconModule,
    ],
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

  constructor(
    private fb: FormBuilder,
    private equipe_linka_negociosSevice: EquipeLinkaNegociosService
  ) {
    this.casoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(20)]],
      descricao: ['', [Validators.required, Validators.maxLength(150)]],
      imagem: ['', Validators.required],
    });

    this.editCasoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(20)]],
      descricao: ['', [Validators.required, Validators.maxLength(150)]],
      imagem: ['', Validators.required],
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
      imagem: caso.imagem,
    });
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  onSubmit() {
    if (this.casoForm.valid) {
      this.equipe_linka_negociosSevice
        .create(this.casoForm.value)
        .subscribe((response) => {
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
        ...this.editCasoForm.value,
      };

      this.equipe_linka_negociosSevice
        .update(updatedCaso)
        .subscribe((response) => {
          console.log('Caso de sucesso atualizado com sucesso:', response);
          this.loadEquipe();
          this.closeEditModal();
        });
    }
  }

  deleteCaso(id: number): void {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Não será possível reverter esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      customClass: {
        confirmButton: 'custom-confirm-button',
      },
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.equipe_linka_negociosSevice.delete(id).subscribe({
          next: () => {
            console.log('Caso de sucesso excluído com sucesso');
            Swal.fire({
              title: 'Excluído!',
              text: 'Caso de sucesso excluído com sucesso.',
              icon: 'success',
              customClass: {
                confirmButton: 'custom-confirm-button',
              },
            }).then(() => {
              window.location.reload();
            });
          },
          error: (error) => {
            console.error('Erro ao excluir o caso de sucesso', error);
            Swal.fire(
              'Erro',
              'Erro ao excluir caso de sucesso: ' + error.message,
              'error'
            );
          },
        });
      }
    });
  }
}
