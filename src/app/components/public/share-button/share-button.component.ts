import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-share-button',
  standalone: true,
  imports: [],
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss'] // Corrigi de 'styleUrl' para 'styleUrls'
})
export class ShareButtonComponent {

  constructor(private snackBar: MatSnackBar) {
    console.log(this.tituloCompartilhado);
  }

  @Input() urlSite: string = '';
  @Input() tituloCompartilhado: string = '';
  @Input() textoCompartilhado: string = '';

  shareContent(): void {
    if (navigator.share) {
      navigator.share({
        title: this.tituloCompartilhado,
        text: this.textoCompartilhado,
        url: this.urlSite,
      })
      .then(() => {
        console.log(this.tituloCompartilhado);
        this.snackBar.open('Sucesso ao compartilhar!!', 'Fechar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      })
      .catch((error) => {
        this.snackBar.open('Erro ao compartilhar!!', 'Fechar', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
        console.error('Erro ao compartilhar:', error); // Adiciona um log para ajudar na depuração
      });
    } else {
      console.log('API de compartilhamento não suportada.');
      alert('Parece que o seu navegador não suporta a função de compartilhamento. Por favor, tente atualizar o navegador ou use um navegador mais moderno para acessar essa funcionalidade.');
    }
  }
}
