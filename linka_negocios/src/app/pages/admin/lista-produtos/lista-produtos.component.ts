import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProdutosService } from '../../../services/produtos.service';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { MatIconModule } from '@angular/material/icon';
import { Produto } from '../../../models/produtos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-produtos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarAdminComponent, MatIconModule],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.scss'
})
export class ListaProdutosComponent {
  produtos: Produto[] = [];
  isModalOpen = false;
  isEditModalOpen = false;
  servicoForm: FormGroup;
  editServicoForm: FormGroup;
  produtoSelecionado: Produto | null = null;

  constructor(private produtosService: ProdutosService, private fb: FormBuilder, private router: Router) {
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
      beneficio1: [''],
      problema_beneficio1: [''],
      beneficio2: [''],
      problema_beneficio2: [''],
      beneficio3: [''],
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
          console.error('Nenhum produto encontrado.');
        }
      },
      (error) => {
        console.error('Erro ao listar produtos:', error);
      }
    );
  }

  listarProdutos(): void {
    this.produtosService.read().subscribe(
      (response: any) => {
        if (response.success) {
          this.produtos = response.data;  
        } else {
          console.error('Nenhum produto encontrado.');
        }
      },
      (error) => {
        console.error('Erro ao listar produtos:', error);
      }
    );
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openEditModal(produto: Produto) {
    this.produtoSelecionado = produto;
    this.editServicoForm.patchValue(produto); // Preenche o formulário com os dados do produto selecionado
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  onSubmit() {
    if (this.servicoForm.valid) {
      this.produtosService.create(this.servicoForm.value).subscribe(() => {
        this.loadProdutos();
        this.closeModal();
      });
    }
  }

  onEditSubmit() {
    if (this.editServicoForm.valid && this.produtoSelecionado) {
      const updatedProduto = { ...this.produtoSelecionado, ...this.editServicoForm.value };
      this.produtosService.uptadeProduto(updatedProduto).subscribe(() => {
        this.loadProdutos();
        this.closeEditModal();
      });
    }
  }

  deleteProduto(id?: number) {
    if (id !== undefined && confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtosService.deleteProduto(id).subscribe(() => {
        this.loadProdutos();
      });
    } else {
      console.error('O ID do produto é indefinido');
    }
  }

  criarProduto(){
    this.router.navigate(['/creat-produtos']);
  }
  
}
