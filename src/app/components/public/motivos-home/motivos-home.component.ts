import { Component, OnInit } from '@angular/core';
import { MotivosEscolherEmpresaService } from '../../../services/motivos-escolher-empresa.service';
import { CommonModule } from '@angular/common';

interface Motivos_Escolher_Empresa {
  id?: number;
  titulo: string;
  descricao: string;
  imagem: string;
}

@Component({
    selector: 'app-motivos-home',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './motivos-home.component.html',
    styleUrl: './motivos-home.component.scss'
})
export class MotivosHomeComponent implements OnInit{
  motivos: Motivos_Escolher_Empresa[] = [];

  constructor(private motivosService: MotivosEscolherEmpresaService) {}

  ngOnInit(): void {
    this.motivosService.getMotivos().subscribe(
      data => {
        this.motivos = data.data;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
