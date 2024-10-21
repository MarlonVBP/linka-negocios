import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { RouterLink } from '@angular/router';
import { DashboardComponent } from "../../../components/public/dashboard/dashboard.component";
import { PostsService } from '../../../services/posts.service';
import { CategoriasService } from '../../../services/categorias.service';
import { SpinnerComponent } from "../../../components/public/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { LastTitles } from '../../../models/last-titles';
import { TextEllipsisPipe } from '../../../pipes/text-ellipsis.pipe';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [SidebarAdminComponent, RouterLink, DashboardComponent, SpinnerComponent, CommonModule, TextEllipsisPipe],animations: [
    trigger('scaleInOut', [
      // Estado inicial (quando o elemento não está presente)
      state('void', style({ transform: 'scale(0)', opacity: 0 })),

      // Transição de entrada (cresce de 0 para 100%)
      transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),  // Começa pequeno e invisível
        animate('500ms ease-in', style({ transform: 'scale(1)', opacity: 1 }))  // Cresce até 100%
      ]),

      // Transição de saída (diminui de 100% para 0)
      transition(':leave', [
        animate('500ms ease-out', style({ transform: 'scale(0)', opacity: 0 }))  // Diminui até desaparecer
      ])
    ])
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {
  numberOfPosts: number = 0;
  numberOfCategorias: number = 0;
  lastTitles: LastTitles[] = [];
  dataAtual = new Date();
  anoAtual = this.dataAtual.getFullYear();

  spinnerPost: boolean = true;
  spinnerPostTitles: boolean = true;
  spinnerCategoria: boolean = true;
  nome: string = 'Admin';

  constructor(private postsService: PostsService, private categoriasServices: CategoriasService
  ) {
    this.nome = localStorage.getItem('nome') ?? 'admin';
    this.spinnerPost = true;
    this.postsService.countPost().subscribe((response: any) => {
      console.log(response)
      if (response.success == true) {
        this.numberOfPosts = response.response[0]['COUNT(*)'];
      }
      this.spinnerPost = false;
    })

    this.spinnerPostTitles = true;
    this.postsService.getTitlePosts().subscribe((response: any) => {
      console.log(response)
      if (response.success == true) {
        this.lastTitles = response.response;
      }
      this.spinnerPostTitles = false;
    })

    this.spinnerCategoria = true;
    this.categoriasServices.countCategorias().subscribe((response: any) => {
      console.log(response)
      if (response.success == true) {
        this.numberOfCategorias = response.response[0]['COUNT(*)'];
      }
      this.spinnerCategoria = false;
    })
  }

  @ViewChild('buttonMes') buttonMes!: ElementRef;
  @ViewChild('buttonAno') buttonAno!: ElementRef;

  toggleButton() {
    const mesElement = this.buttonMes.nativeElement;
    const anoElement = this.buttonAno.nativeElement;

    mesElement.classList.toggle('active');
    anoElement.classList.toggle('active');
  }
  filter: boolean = true;
  filtrar(filtro: string) {
    this.filter = filtro == 'mes' ? true : false;
  }

  totalPosts: number = 120; // Exemplo estático
  topPoster: string = 'Maria Silva'; // Exemplo estático
  postsThisMonth: number = 20; // Exemplo estático
  totalComments: number = 450; // Exemplo estático
}
