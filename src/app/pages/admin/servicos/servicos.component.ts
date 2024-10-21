import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicosService } from '../../../services/servicos.service';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { MatIconModule } from '@angular/material/icon';

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
  imports: [CommonModule, ReactiveFormsModule, SidebarAdminComponent, MatIconModule],
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent {
  servicos: any[] = [];
  isModalOpen = false;
  isEditModalOpen = false;
  servicoForm: FormGroup;
  editServicoForm: FormGroup;
  editingServicoId: number | null = null;

  constructor(private fb: FormBuilder, private servicoService: ServicosService) {
    this.servicoForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      imagem: ['', Validators.required],
      conteudo1: ['', Validators.required],
      conteudo2: ['', Validators.required],
      conteudo3: ['', Validators.required]
    });

    this.editServicoForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      imagem: ['', Validators.required],
      conteudo1: ['', Validators.required],
      conteudo2: ['', Validators.required],
      conteudo3: ['', Validators.required]
    });

    this.loadServicos();
  }

  loadServicos() {
    this.servicoService.getServicos().subscribe(data => {
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
      conteudo3: servico.conteudo3
    });
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  onSubmit() {
    if (this.servicoForm.valid) {
      this.servicoService.addServico(this.servicoForm.value).subscribe(response => {
        console.log('Serviço cadastrado com sucesso:', response);
        this.loadServicos();
        this.closeModal();
      });
    }
  }

  onEditSubmit() {
    if (this.editServicoForm.valid && this.editingServicoId !== null) {
      const updatedServico = {
        id: this.editingServicoId,
        ...this.editServicoForm.value
      };

      this.servicoService.updateServico(updatedServico).subscribe(response => {
        console.log('Serviço atualizado com sucesso:', response);
        this.loadServicos();
        this.closeEditModal();
      });
    }
  }

  deleteServico(id: number) {
    if (confirm('Você tem certeza que deseja excluir este serviço?')) {
      this.servicoService.deleteServico(id).subscribe(response => {
        console.log('Serviço excluído com sucesso:', response);
        this.loadServicos();
      });
    }
  }
}
