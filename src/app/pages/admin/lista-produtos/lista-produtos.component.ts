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
      titulo_breve: ['', [Validators.required, Validators.maxLength(25)]],
      detalhes_problema_beneficios: ['', [Validators.required, Validators.maxLength(130)]],
      destaque_problemas: ['', [Validators.required, Validators.maxLength(70)]],
      destaque_beneficio1: ['', [Validators.required, Validators.maxLength(25)]],
      destaque_beneficio2: ['', [Validators.required, Validators.maxLength(25)]],
      destaque_beneficio3: ['', [Validators.required, Validators.maxLength(25)]],
      cta: ['', [Validators.required, Validators.maxLength(500)]],
      imagem_placeholder: [[Validators.required, Validators.maxLength(25)]],
      problema_beneficio1: ['', [Validators.required, Validators.maxLength(25)]],
      problema_beneficio2: ['', [Validators.required, Validators.maxLength(25)]],
      problema_beneficio3: ['', [Validators.required, Validators.maxLength(25)]],
      porque_clicar: ['', [Validators.required, Validators.maxLength(25)]],
      pergunta1: ['', [Validators.required, Validators.maxLength(25)]],
      resposta1: ['', [Validators.required, Validators.maxLength(25)]],
      pergunta2: ['', [Validators.required, Validators.maxLength(25)]],
      resposta2: ['', [Validators.required, Validators.maxLength(25)]],
      pergunta3: ['', [Validators.required, Validators.maxLength(25)]],
      resposta3: ['', [Validators.required, Validators.maxLength(25)]],
      pergunta4: ['', [Validators.required, Validators.maxLength(25)]],
      resposta4: ['', [Validators.required, Validators.maxLength(25)]],
      pergunta5: ['', [Validators.required, Validators.maxLength(25)]],
      resposta5: ['', [Validators.required, Validators.maxLength(25)]]
    });

    this.editServicoForm = this.fb.group({
      titulo_breve: ['', Validators.required],
      detalhes_problema_beneficios: ['', Validators.required],
      destaque_problemas: ['', Validators.required],
      destaque_beneficio1: ['', Validators.required],
      destaque_beneficio2: ['', Validators.required],
      destaque_beneficio3: ['', Validators.required],
      cta: ['', Validators.required],
      imagem_placeholder: [Validators.required],
      problema_beneficio1: ['', Validators.required],
      problema_beneficio2: ['', Validators.required],
      problema_beneficio3: ['', Validators.required],
      porque_clicar: ['', Validators.required],
      pergunta1: ['', Validators.required],
      resposta1: ['', Validators.required],
      pergunta2: ['', Validators.required],
      resposta2: ['', Validators.required],
      pergunta3: ['', Validators.required],
      resposta3: ['', Validators.required],
      pergunta4: ['', Validators.required],
      resposta4: ['', Validators.required],
      pergunta5: ['', Validators.required],
      resposta5: ['', Validators.required]
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
