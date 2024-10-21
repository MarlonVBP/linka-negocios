import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProdutosService } from '../../../services/produtos.service';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { MatIconModule } from '@angular/material/icon';
import { Produto } from '../../../models/produtos';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarAdminComponent, MatIconModule],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.scss'
})
export class ListaProdutosComponent {
  produtos: Produto[] = [];
  isEditModalOpen = false;
  servicoForm: FormGroup;
  editServicoForm: FormGroup;
  produtoSelecionado: Produto | null = null;

  constructor(private produtosService: ProdutosService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.servicoForm = this.fb.group({
      titulo_breve: ['', Validators.required],
      imagem_placeholder: ['', Validators.required],
      // Adicione outros campos do formulário conforme necessário
    });

    this.editServicoForm = this.fb.group({
      titulo_breve: ['', Validators.required],
      detalhes_problema_beneficios: [''],
      destaque_problemas: [''],
      destaque_beneficio1: [''],
      destaque_beneficio2: [''],
      destaque_beneficio3: [''],
      cta: [''],
      imagem_placeholder: ['', Validators.required],
      problema_beneficio1: [''],
      problema_beneficio2: [''],
      problema_beneficio3: [''],
      porque_clicar: [''],
      pergunta1: [''],
      resposta1: [''],
      pergunta2: [''],
      resposta2: [''],
      pergunta3: [''],
      resposta3: [''],
      pergunta4: [''],
      resposta4: [''],
      pergunta5: [''],
      resposta5: ['']
    });
  }

  ngOnInit() {
    this.loadProdutos();
  }

  loadProdutos() {
    this.produtosService.read().subscribe(
      (response: any) => {
        if (response.success) {
          this.produtos = response.data;
        } else {
          this.snackBar.open('Nenhum produto encontrado.', 'Fechar', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
          });
        }
      },
      (error) => {
        this.snackBar.open('Erro ao listar os produtos.', 'Fechar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }
    );
  }

  openEditModal(produto: Produto) {
    this.produtoSelecionado = produto;
    this.editServicoForm.patchValue(produto); // Preenche o formulário com os dados do produto selecionado
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  onEditSubmit() {
    if (this.editServicoForm.valid && this.produtoSelecionado) {
      const updatedProduto = { ...this.produtoSelecionado, ...this.editServicoForm.value };
      this.produtosService.uptadeProduto(updatedProduto).subscribe((response: any) => {
        if (response.success) {
          this.loadProdutos();
          this.closeEditModal();
          this.snackBar.open('Produto atualizado com sucesso!!!', 'Fechar', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
          });
          return;
        }
        this.snackBar.open('Erro ao atualizar pruduto', 'Fechar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      });
    }
  }

  deleteProduto(id?: number) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Não será possível reverter esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      customClass: {
        confirmButton: 'custom-confirm-button'
      },
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtosService.deleteProduto(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Excluído!',
              text: 'Produto excluído com sucesso.',
              icon: 'success',
              customClass: {
                confirmButton: 'custom-confirm-button'
              }
            });
            this.loadProdutos();
          },
          error: () => {
            Swal.fire('Erro', 'Erro ao excluir produto.', 'error');
          }
        });
      }
    });
  }

  criarProduto() {
    this.router.navigate(['/creat-produtos']);
  }

}
