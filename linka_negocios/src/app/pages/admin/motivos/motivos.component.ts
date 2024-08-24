import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MotivosEscolherEmpresaService } from '../../../services/motivos-escolher-empresa.service';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { MatIconModule } from '@angular/material/icon';

interface Motivos_Escolher_Empresa {
  id?: number;
  titulo: string;
  descricao: string;
  imagem: string;
}

@Component({
  selector: 'app-motivos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarAdminComponent, MatIconModule],
  templateUrl: './motivos.component.html',
  styleUrls: ['./motivos.component.scss']
})
export class MotivosComponent {
  motivos: any[] = [];
  isModalOpen = false;
  isEditModalOpen = false;
  motivoForm: FormGroup;
  editMotivoForm: FormGroup;
  editingMotivoId: number | null = null;

  constructor(private fb: FormBuilder, private motivoService: MotivosEscolherEmpresaService) {
    this.motivoForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      imagem: ['', Validators.required]
    });

    this.editMotivoForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      imagem: ['', Validators.required]
    });

    this.loadMotivos();
  }

  loadMotivos() {
    this.motivoService.getMotivos().subscribe(data => {
      this.motivos = data.data;
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openEditModal(motivo: any) {
    this.editingMotivoId = motivo.id;
    this.editMotivoForm.patchValue({
      titulo: motivo.titulo,
      descricao: motivo.descricao,
      imagem: motivo.imagem
    });
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  onSubmit() {
    if (this.motivoForm.valid) {
      this.motivoService.addMotivo(this.motivoForm.value).subscribe(response => {
        console.log('Motivo cadastrado com sucesso:', response);
        this.loadMotivos();
        this.closeModal();
      });
    }
  }

  onEditSubmit() {
    if (this.editMotivoForm.valid && this.editingMotivoId !== null) {
      const updatedServico = {
        id: this.editingMotivoId,
        ...this.editMotivoForm.value
      };

      this.motivoService.updateMotivo(updatedServico).subscribe(response => {
        console.log('Serviço atualizado com sucesso:', response);
        this.loadMotivos();
        this.closeEditModal();
      });
    }
  }

  deleteMotivo(id: number) {
    if (confirm('Você tem certeza que deseja excluir este serviço?')) {
      this.motivoService.deleteMotivo(id).subscribe(response => {
        console.log('Serviço excluído com sucesso:', response);
        this.loadMotivos();
      });
    }
  }
}
