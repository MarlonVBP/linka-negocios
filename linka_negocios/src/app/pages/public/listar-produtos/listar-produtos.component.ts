import { Component, OnInit } from '@angular/core';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutosService } from '../../../services/produtos.service';
import { Produto } from '../../../models/produtos';
import { IconeWhatsappComponent } from '../../../components/public/icone-whatsapp/icone-whatsapp.component';

@Component({
  selector: 'app-listar-produtos',
  standalone: true,
  imports: [SidebarClienteComponent, FooterComponent, CommonModule, RouterModule, IconeWhatsappComponent],
  templateUrl: './listar-produtos.component.html',
  styleUrl: './listar-produtos.component.scss'
})
export class ListarProdutosComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(private produtosService: ProdutosService) {}

  ngOnInit(): void {
    this.listarProdutos();
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
}