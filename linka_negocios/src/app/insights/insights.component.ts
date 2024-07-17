import { Component } from '@angular/core';
import { SidebarClienteComponent } from '../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../components/public/footer/footer.component';
import { identity } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [SidebarClienteComponent, FooterComponent, CommonModule, RouterModule],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.scss'
})
export class InsightsComponent {
  posts: any[] = [
    {
      id: '1',
      titulo: '11 excellent examples of artificial intelligence in the workplace',
      resumo: 'Phasellus pellentesque, quam sed tempus tempus, dui magna semper urna, placerat tristique diam augue ut nunc. Phasellus pellentesque, quam sed tempus tempus,',
      imgUrl: 'https://a.imagem.app/3qQJoG.png',
      comentarios: '15',
      views: '95',
      data: '15 mins ago'
    },
    {
      id: '2',
      titulo: 'Guidelines for Making Engaging Social Media Videos ',
      resumo: 'Phasellus pellentesque, quam sed tempus tempus, dui magna semper urna, placerat tristique diam augue ut nunc. Phasellus pellentesque, quam sed tempus tempus,',
      imgUrl: 'https://a.imagem.app/3qQJoG.png',
      comentarios: '15',
      views: '95',
      data: '15 mins ago'
    },
    {
      id: '3',
      titulo: 'How to Make Engaging TikTok Content to Promote Your Brand',
      resumo: 'Phasellus pellentesque, quam sed tempus tempus, dui magna semper urna, placerat tristique diam augue ut nunc. Phasellus pellentesque, quam sed tempus tempus,',
      imgUrl: 'https://a.imagem.app/3qQJoG.png',
      comentarios: '15',
      views: '95',
      data: '15 mins ago'
    },
    {
      id: '4',
      titulo: '10 Most Effective Link Building Techniques You Can Use',
      resumo: 'Phasellus pellentesque, quam sed tempus tempus, dui magna semper urna, placerat tristique diam augue ut nunc. Phasellus pellentesque, quam sed tempus tempus,',
      imgUrl: 'https://a.imagem.app/3qQJoG.png',
      comentarios: '15',
      views: '95',
      data: '15 mins ago'
    }
  ]
}
