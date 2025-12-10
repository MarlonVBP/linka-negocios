import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../../services/dashboard.service';
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
    selector: 'app-dashboard',
    imports: [SpinnerComponent],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnChanges {
  @Input() filtro: { mes?: any, ano?: any } = { mes: new Date().getMonth() + 1 };
  dashBoardData: any = {};
  spinnerDashBoard: boolean = true;

  constructor(private dashboardService: DashboardService) {}

  ngAfterViewInit(): void {
    Chart.register(...registerables);
    this.buscarDados();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filtro'] && !changes['filtro'].isFirstChange()) {
      this.buscarDados();
    }
  }

  private buscarDados(): void {
    this.spinnerDashBoard = true;

    if (this.filtro.mes) {
      this.dashboardService.read(this.filtro.mes).subscribe((response: any) => {
        this.processarDados(response.response, true); // Filtrar por mês
      }, error => {
        console.error('Erro ao buscar dados da API:', error);
      });
    } else if (this.filtro.ano) {
      this.dashboardService.readAno(this.filtro.ano).subscribe((response: any) => {
        this.processarDados(response.response, false); // Filtrar por ano
      }, error => {
        console.error('Erro ao buscar dados da API:', error);
      });
    }
  }

  private processarDados(dados: any[], isMes: boolean): void {
    console.log('Dados recebidos:', dados);

    if (isMes) {
      const diasNoMes = this.getDiasNoMes(this.filtro.mes, this.filtro.ano);
      const resultados = Array(diasNoMes).fill(0);

      // Preenche os dados disponíveis
      dados.forEach((item: { dia: number, total_dados: string }) => {
        const diaIndex = item.dia - 1; // Ajusta o índice para zero-based
        if (diaIndex >= 0 && diaIndex < diasNoMes) {
          resultados[diaIndex] = parseInt(item.total_dados); // Converte para número
        }
      });

      this.dashBoardData = resultados;
    } else {
      const resultados = Array(12).fill(0);
      const mesesAbreviados = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

      // Preenche os dados por mês
      dados.forEach((item: { mes: number, total_dados: string }) => {
        const mesIndex = item.mes - 1; // Ajusta o índice para zero-based
        if (mesIndex >= 0 && mesIndex < 12) {
          resultados[mesIndex] = parseInt(item.total_dados); // Converte para número
        }
      });

      this.dashBoardData = resultados;
    }

    this.spinnerDashBoard = false;

    setTimeout(() => {
      const labels = isMes
        ? Array.from({ length: this.dashBoardData.length }, (_, i) => (i + 1).toString()) // Dias do mês
        : ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']; // Meses abreviados

      this.initializeChart(labels); // Inicializa o gráfico com os rótulos corretos
    }, 300);
  }

  private getDiasNoMes(mes: number, ano?: number): number {
    return new Date(ano || new Date().getFullYear(), mes, 0).getDate();
  }

  private initializeChart(labels: string[]): void {
    const dataValues = this.dashBoardData;

    const data = {
      labels: labels,
      datasets: [{
        label: 'Visitas',
        data: dataValues,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        stack: 'combined',
        type: 'bar'
      }]
    };

    const config: any = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            stacked: true
          }
        }
      }
    };

    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      new Chart(ctx, config);
    }
  }
}
