import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MotivosEscolherEmpresaService } from '../../../services/motivos-escolher-empresa.service';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';

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
      titulo: ['', [Validators.required, Validators.maxLength(20)]],
      descricao: ['', [Validators.required, Validators.maxLength(80)]],
      imagem: ['', Validators.required]
    });
  
    this.editMotivoForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(20)]],
      descricao: ['', [Validators.required, Validators.maxLength(80)]],
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
      const titulo = this.motivoForm.get('titulo')?.value;
      const descricao = this.motivoForm.get('descricao')?.value;
  
      if (titulo.length > 20) {
        Swal.fire({
          text: 'O título deve ter no máximo 20 caracteres.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return; 
      }
  
      if (descricao.length > 80) {
        Swal.fire({
          text: 'A descrição deve ter no máximo 80 caracteres.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      this.motivoService.addMotivo(this.motivoForm.value).subscribe(response => {
        console.log('Motivo cadastrado com sucesso:', response);
        Swal.fire({
          text: 'Motivo inserido!',
          imageUrl: 'https://a.imagem.app/3ubzQX.png', 
          imageWidth: 80,
          imageHeight: 80,
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'custom-confirm-button'  
          }
        });
        this.loadMotivos();
        this.closeModal();
      });
    } else {
      this.closeModal();
      setTimeout(() => {
        Swal.fire({
          text: 'Por favor, preencha todos os campos obrigatórios corretamente. O título deve ter no máximo 20 caracteres e a descrição deve ter no máximo 80 caracteres.',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'custom-confirm-button'  
          }
        });
      }, 300); 
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
        Swal.fire({
          text: 'Motivo atualizado com sucesso!',
          imageUrl: 'https://a.imagem.app/3ubzQX.png', 
          imageWidth: 80,
          imageHeight: 80,
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'custom-confirm-button'  
          }
        });
        this.loadMotivos();
        this.closeEditModal();
      });
    }
  }

  deleteMotivo(id: number) {
    if (confirm('Você tem certeza que deseja excluir este serviço?')) {
      this.motivoService.deleteMotivo(id).subscribe(response => {
        Swal.fire({
          text: 'Motivo excluído com sucesso!',
          imageUrl: 'https://a.imagem.app/3ubzQX.png', 
          imageWidth: 80,
          imageHeight: 80,
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'custom-confirm-button'  
          }
        });
        this.loadMotivos();
      });
    }
  }
}
