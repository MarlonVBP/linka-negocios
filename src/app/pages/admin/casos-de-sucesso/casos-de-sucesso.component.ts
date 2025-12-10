import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CasosDeSucessoService } from '../../../services/casos-de-sucesso.service';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

interface CasoDeSucesso {
  id: number;
  titulo: string;
  mensagem: string;
  imagem: string;
  criado_em: string;
}

@Component({
    selector: 'app-casos-de-sucesso',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SidebarAdminComponent,
        MatIconModule,
    ],
    templateUrl: './casos-de-sucesso.component.html',
    styleUrls: ['./casos-de-sucesso.component.scss']
})
export class CasosDeSucessoComponent implements OnInit {
  casosSucesso: CasoDeSucesso[] = [];
  isModalOpen = false;
  isEditModalOpen = false;
  casoForm: FormGroup;
  editCasoForm: FormGroup;
  editingCasoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private casosService: CasosDeSucessoService
  ) {
    this.casoForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(30)]],
      mensagem: ['', [Validators.required, Validators.maxLength(370)]],
      imagem: ['', Validators.required],
    });

    this.editCasoForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(30)]],
      mensagem: ['', [Validators.required, Validators.maxLength(370)]],
      imagem: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadCasos();
  }

  loadCasos(): void {
    this.casosService.read().subscribe(
      (response: any) => {
        this.casosSucesso = response.casos_sucesso;
      },
      (error) => {
        console.error('Erro ao carregar casos de sucesso', error);
      }
    );
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openEditModal(caso: CasoDeSucesso) {
    this.editingCasoId = caso.id;

    this.editCasoForm.patchValue({
      titulo: caso.titulo,
      mensagem: caso.mensagem,
      imagem: caso.imagem,
    });
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  onSubmit() {
    if (this.casoForm.valid) {
      this.casosService.create(this.casoForm.value).subscribe((response) => {
        console.log('Caso de sucesso cadastrado com sucesso:', response);
        this.loadCasos();
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

      this.casosService.update(updatedCaso).subscribe((response) => {
        console.log('Caso de sucesso atualizado com sucesso:', response);
        this.loadCasos();
        this.closeEditModal();
      });
    }
  }

  deleteCaso(casoId: number | undefined): void {
    if (casoId === undefined) {
      console.error('ID do caso é indefinido');
      return;
    }

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
        this.casosService.delete(casoId).subscribe({
          next: (response) => {
            if (response.success) {
              this.casosSucesso = this.casosSucesso.filter(
                (caso) => caso.id !== casoId
              );
              Swal.fire({
                title: 'Excluído!',
                text: 'Caso excluído com sucesso.',
                icon: 'success',
                customClass: {
                  confirmButton: 'custom-confirm-button',
                },
              });
            } else {
              console.error('Falha na exclusão do caso', response.message);
              Swal.fire(
                'Erro',
                'Erro ao excluir caso: ' + response.message,
                'error'
              );
            }
          },
          error: (error) => {
            console.error('Erro ao comunicar com a API', error);
            Swal.fire(
              'Erro',
              'Erro ao comunicar com a API: ' + error.message,
              'error'
            );
          },
        });
      }
    });
  }
}
