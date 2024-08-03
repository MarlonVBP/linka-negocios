import { Component } from '@angular/core';
import { ProdutosService } from '../../../services/produtos.service';
import { Produto } from '../../../models/produtos';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-criar-produto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './criar-produto.component.html',
  styleUrl: './criar-produto.component.scss'
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
    beneficio1: '',
    problema_beneficio1: '',
    beneficio2: '',
    problema_beneficio2: '',
    beneficio3: '',
    problema_beneficio3: '',
    porque_clicar: ''
  };

  constructor(private produtosService: ProdutosService) { }

  onSubmit() {
    this.produtosService.create(this.produto).subscribe(
      response => {
        console.log('Produto criado com sucesso!', response);
        // Redirecionar ou mostrar mensagem de sucesso
      },
      error => {
        console.error('Erro ao criar produto', error);
        // Mostrar mensagem de erro
      }
    );
  }
}
