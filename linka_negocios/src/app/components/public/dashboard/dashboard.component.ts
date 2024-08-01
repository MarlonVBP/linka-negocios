import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Dashboard } from '../../../models/dashboard';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  dashBoardData: Dashboard[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngAfterViewInit(): void {
    // Registrar todos os componentes necessários
    Chart.register(...registerables);

    // Buscar dados da API e inicializar o gráfico
    this.dashboardService.read().subscribe((response: any) => {
      this.dashBoardData = response.response ? response.response : [];
      if (this.dashBoardData.length > 0) {
        this.initializeChart();
      }
    }, error => {
      console.error('Erro ao buscar dados da API:', error);
    });
  }

  private initializeChart(): void {
    const DATA_COUNT = 12;

    // Definir os utilitários (substitua isso com seus utilitários reais)
    const Utils = {
      CHART_COLORS: {
        red: 'rgb(255, 99, 132)',
        blue: 'rgb(54, 162, 235)',
      },
      transparentize: (color: string, opacity: number) => {
        const alpha = 1 - opacity;
        return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`);
      }
    };

    // Preparar os dados do gráfico
    const labels = this.dashBoardData[0].mes;
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Visitas', // Mantenha o label se desejar usá-lo nos tooltips
          data: this.dashBoardData[0].dados,
          borderColor: Utils.CHART_COLORS.red,
          backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
          stack: 'combined',
          type: 'bar'
        }
      ]
    };

    // Configuração do gráfico
    const config: any = {
      type: 'bar', // Atualize o tipo do gráfico se necessário
      data: data,
      options: {
        plugins: {
          legend: {
            display: false // Oculta a legenda globalmente
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                // Retorna o label do tooltip (ou qualquer outra informação desejada)
                return context.raw + ': ' + context.dataset.label;
              }
            }
          }
        },
        scales: {
          y: {
            stacked: true
          }
        }
      },
    };

    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      new Chart(ctx, config);
    } else {
      console.error('O contexto 2D do canvas não pôde ser inicializado.');
    }
  }


}
