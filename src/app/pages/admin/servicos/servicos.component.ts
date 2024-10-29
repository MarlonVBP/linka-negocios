import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicosService } from '../../../services/servicos.service';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

interface Servico {
  id?: number;
  titulo: string;
  descricao: string;
  imagem: string;
  conteudo1: string;
  conteudo2: string;
  conteudo3: string;
}
@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SidebarAdminComponent,
    MatIconModule,
  ],
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss'],
})
export class ServicosComponent {
  servicos: any[] = [];
  isModalOpen = false;
  isEditModalOpen = false;
  servicoForm: FormGroup;
  editServicoForm: FormGroup;
  editingServicoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private servicoService: ServicosService
  ) {
    this.servicoForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      imagem: ['', Validators.required],
      conteudo1: ['', Validators.required],
      conteudo2: ['', Validators.required],
      conteudo3: ['', Validators.required],
    });

    this.editServicoForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      imagem: ['', Validators.required],
      conteudo1: ['', Validators.required],
      conteudo2: ['', Validators.required],
      conteudo3: ['', Validators.required],
    });

    this.loadServicos();
  }

  loadServicos() {
    this.servicoService.getServicos().subscribe((data) => {
      this.servicos = data.data;
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openEditModal(servico: any) {
    this.editingServicoId = servico.id;

    this.editServicoForm.patchValue({
      titulo: servico.titulo,
      descricao: servico.descricao,
      imagem: servico.imagem,
      conteudo1: servico.conteudo1,
      conteudo2: servico.conteudo2,
      conteudo3: servico.conteudo3,
    });
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  onSubmit(): void {
    if (this.servicoForm.valid) {
      this.servicoService.addServico(this.servicoForm.value).subscribe({
        next: (response) => {
          console.log('Serviço cadastrado com sucesso:', response);
          Swal.fire({
            title: 'Cadastrado!',
            text: 'Serviço cadastrado com sucesso.',
            icon: 'success',
            customClass: {
              confirmButton: 'custom-confirm-button'
            }
          });
          this.loadServicos();
          this.closeModal();
        },
        error: (error) => {
          console.error('Erro ao cadastrar o serviço:', error);
          Swal.fire('Erro', 'Erro ao cadastrar o serviço.', 'error');
        }
      });
    }
  }

  onEditSubmit(): void {
    if (this.editServicoForm.valid && this.editingServicoId !== null) {
      const updatedServico = {
        id: this.editingServicoId,
        ...this.editServicoForm.value,
      };

      this.servicoService.updateServico(updatedServico).subscribe({
        next: (response) => {
          console.log('Serviço atualizado com sucesso:', response);
          Swal.fire({
            title: 'Atualizado!',
            text: 'Serviço atualizado com sucesso.',
            icon: 'success',
            customClass: {
              confirmButton: 'custom-confirm-button',
            },
          });
          this.loadServicos();
          this.closeEditModal();
        },
        error: (error) => {
          console.error('Erro ao atualizar o serviço:', error);
          Swal.fire('Erro', 'Erro ao atualizar o serviço.', 'error');
        },
      });
    }
  }

  deleteServico(id: number): void {
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
        this.servicoService.deleteServico(id).subscribe({
          next: (response) => {
            console.log('Serviço excluído com sucesso:', response);
            Swal.fire({
              title: 'Excluído!',
              text: 'Serviço excluído com sucesso.',
              icon: 'success',
              customClass: {
                confirmButton: 'custom-confirm-button',
              },
            });
            this.loadServicos();
          },
          error: (error) => {
            console.error('Erro ao comunicar com a API', error);
            Swal.fire('Erro', 'Erro ao excluir serviço.', 'error');
          },
        });
      }
    });
  }
}
