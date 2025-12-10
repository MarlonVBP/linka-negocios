import { Component } from '@angular/core';
import { ProdutosService } from '../../../services/produtos.service';
import { Produto } from '../../../models/produtos';
import { FormsModule } from '@angular/forms';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-criar-produto',
    imports: [FormsModule, SidebarAdminComponent, CommonModule],
    templateUrl: './criar-produto.component.html',
    styleUrls: ['./criar-produto.component.scss']
})
export class CriarProdutoComponent {
  produto: Produto = {
    titulo_breve: '',
    detalhes_problema_beneficios: '',
    destaque_problemas: '',
    destaque_beneficio1: '',
    destaque_beneficio2: '',
    destaque_beneficio3: '',
    cta: '',
    imagem_placeholder: '',
    problema_beneficio1: '',
    problema_beneficio2: '',
    problema_beneficio3: '',
    porque_clicar: '',
    pergunta1: '',
    resposta1: '',
    pergunta2: '',
    resposta2: '',
    pergunta3: '',
    resposta3: '',
    pergunta4: '',
    resposta4: '',
    pergunta5: '',
    resposta5: ''
  };

  currentSection: number = 1;
  sections: number[] = [1, 2, 3, 4, 5, 6];  // Lista de seções

  constructor(private produtosService: ProdutosService, private snackBar: MatSnackBar) { }

  onSubmit() {
    this.produtosService.create(this.produto).subscribe(
      response => {
        this.snackBar.open('Produto criado com sucesso!!!', 'Fechar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
        this.resetarForm();
      },
      error => {
        console.error('Erro ao criar produto', error);
      }
    );
  }

  nextSection() {
    if (this.isSectionComplete()) {
      if (this.currentSection === 6) {
        this.onSubmit(); // Envia o formulário na última seção
      } else {
        this.currentSection++;
      }
    }
  }

  previousSection() {
    if (this.currentSection > 1) {
      this.currentSection--;
    }
  }

  isSectionComplete(): boolean | undefined | string {
    switch (this.currentSection) {
      case 1:
        return this.produto.titulo_breve && this.produto.detalhes_problema_beneficios;
      case 2:
        return this.produto.destaque_problemas && this.produto.destaque_beneficio1 &&
          this.produto.destaque_beneficio2 && this.produto.destaque_beneficio3;
      case 3:
        return this.produto.cta && this.produto.imagem_placeholder;
      case 4:
        return this.produto.problema_beneficio1 && this.produto.problema_beneficio2 &&
          this.produto.problema_beneficio3;
      case 5:
        return this.produto.porque_clicar;
      case 6:
        return this.produto.pergunta1 && this.produto.resposta1 &&
          this.produto.pergunta2 && this.produto.resposta2 &&
          this.produto.pergunta3 && this.produto.resposta3 &&
          this.produto.pergunta4 && this.produto.resposta4 &&
          this.produto.pergunta5 && this.produto.resposta5;
      default:
        return false;
    }
  }

  resetarForm() {
    this.produto = {
      titulo_breve: '',
      detalhes_problema_beneficios: '',
      destaque_problemas: '',
      destaque_beneficio1: '',
      destaque_beneficio2: '',
      destaque_beneficio3: '',
      cta: '',
      imagem_placeholder: '',
      problema_beneficio1: '',
      problema_beneficio2: '',
      problema_beneficio3: '',
      porque_clicar: '',
      pergunta1: '',
      resposta1: '',
      pergunta2: '',
      resposta2: '',
      pergunta3: '',
      resposta3: '',
      pergunta4: '',
      resposta4: '',
      pergunta5: '',
      resposta5: ''
    };

    this.currentSection = 1;
  }
}
