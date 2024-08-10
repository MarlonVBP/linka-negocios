import { Component, OnInit } from '@angular/core';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutosService } from '../../../services/produtos.service';
import { Produto } from '../../../models/produtos';

@Component({
  selector: 'app-listar-produtos',
  standalone: true,
  imports: [SidebarClienteComponent, FooterComponent, CommonModule, RouterModule],
  templateUrl: './listar-produtos.component.html',
  styleUrl: './listar-produtos.component.scss'
})
export class ListarProdutosComponent implements OnInit {
  produtos: Produto[] = [];  // Array para armazenar os produtos

  constructor(private produtosService: ProdutosService) {}

  ngOnInit(): void {
    this.listarProdutos();  // Chama a função para listar os produtos quando o componente é inicializado
  }

  listarProdutos(): void {
    this.produtosService.read().subscribe(
      (response: any) => {
        if (response.success) {
          this.produtos = response.data;  // Atribui o array de produtos da resposta
        } else {
          console.error('Nenhum produto encontrado.');
        }
      },
      (error) => {
        console.error('Erro ao listar produtos:', error);
      }
    );
  }
}