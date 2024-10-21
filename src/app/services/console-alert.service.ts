import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConsoleAlertService {
  // Limpa o console após 3 segundos
  // Função para simular uma mensagem sendo "digitada"
  typeMessage(message: string, style: any) {
    console.clear(); // Limpa o console a cada iteração
    console.log(`%c ${message}`, style); // Mostra a mensagem até a letra atual
  }
  style = `
        color: red;
        font-size: 20px;
        font-weight: bold;
      `;

  // Mensagem a ser "digitada"
  message =
    'Olá! Esta é uma área de desenvolvedores, e alterações aqui podem afetar o funcionamento do site. Se precisar de ajuda ou suporte, estamos prontos para ajudar! 😊 Pressione F12 para voltar ao site com segurança.';

  alertFunction() {
    // Exibe a mensagem com animação de digitação
    this.typeMessage(this.message, this.style);
  }
}
