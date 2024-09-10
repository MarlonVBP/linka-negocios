import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CasosDeSucessoService } from '../../../services/casos-de-sucesso.service'; 
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { MatIconModule } from '@angular/material/icon';

interface CasoDeSucesso {
  id: number;
  titulo: string;
  mensagem: string;
  imagem: string;
  criado_em: string;
}

@Component({
  selector: 'app-casos-de-sucesso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarAdminComponent, MatIconModule],
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

  constructor(private fb: FormBuilder, private casosService: CasosDeSucessoService) {
    this.casoForm = this.fb.group({
      titulo: ['', Validators.required],
      mensagem: ['', Validators.required],
      imagem: ['', Validators.required]
    });

    this.editCasoForm = this.fb.group({
      titulo: ['', Validators.required],
      mensagem: ['', Validators.required],
      imagem: ['', Validators.required]
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
      imagem: caso.imagem
    });
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  onSubmit() {
    if (this.casoForm.valid) {
      this.casosService.create(this.casoForm.value).subscribe(response => {
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
        ...this.editCasoForm.value
      };

      this.casosService.update(updatedCaso).subscribe(response => { 
        console.log('Caso de sucesso atualizado com sucesso:', response);
        this.loadCasos();
        this.closeEditModal();
      });
    }
  }

  deleteCaso(casoId: number) {
    if (confirm('Você tem certeza que deseja excluir este caso de sucesso?')) {
      this.casosService.delete(casoId).subscribe(response => { 
        console.log('Caso de sucesso excluído com sucesso:', response);
        this.loadCasos();
      });
    }
  }
}
