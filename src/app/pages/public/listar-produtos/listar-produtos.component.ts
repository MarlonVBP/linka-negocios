import { Component, OnInit } from '@angular/core';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProdutosService } from '../../../services/produtos.service';
import { Produto } from '../../../models/produtos';
import { IconeWhatsappComponent } from '../../../components/public/icone-whatsapp/icone-whatsapp.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { ConsoleAlertService } from '../../../services/console-alert.service';

@Component({
  selector: 'app-listar-produtos',
  standalone: true,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '0.5s ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
  imports: [
    SidebarClienteComponent,
    FooterComponent,
    CommonModule,
    RouterModule,
    IconeWhatsappComponent,
  ],
  templateUrl: './listar-produtos.component.html',
  styleUrl: './listar-produtos.component.scss',
})
export class ListarProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  isLoadingSpinner: boolean = false;

  constructor(
    private produtosService: ProdutosService,
    private alerMensage: ConsoleAlertService
  ) {
    this.alerMensage.alertFunction();
  }

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos(): void {
    this.isLoadingSpinner = true;
    this.produtosService.read().subscribe(
      (response: any) => {
        this.isLoadingSpinner = false;
        if (response.success) {
          this.produtos = response.data;
        } else {
          console.error('Nenhum produto encontrado.');
        }
      },
      (error) => {
        this.isLoadingSpinner = false;
        console.error('Erro ao listar produtos:', error);
      }
    );
  }
}
