import { Component } from '@angular/core';
import { SidebarAdminComponent } from "../../../components/public/sidebar-admin/sidebar-admin.component";
import { CommonModule } from '@angular/common';
import { Faq } from '../../../models/faq';
import { FaqsService } from '../../../services/faqs.service';
import { CapitalizeFirstPipe } from '../../../pipes/capitalize-first.pipe';

@Component({
    selector: 'app-perguntas',
    imports: [SidebarAdminComponent, CommonModule, CapitalizeFirstPipe],
    templateUrl: './perguntas.component.html',
    styleUrl: './perguntas.component.scss'
})
export class PerguntasComponent {
  constructor(private perguntasService: FaqsService) {
    this.perguntasService.read(true).subscribe((response: any) => {
      console.log(response);
      if (response.success == true) {
        this.perguntas = response.response;
      }
    })
  }

  perguntas: Faq[] = [];

  submitPerguntasForm(id: number): void {
    console.log(id);

    const inputElement = document.getElementById(`resposta-${id}`) as HTMLInputElement;
    const resposta = inputElement ? inputElement.value : null;

    this.perguntasService.create({ "id": id, "resposta": resposta }).subscribe(() => {
      this.perguntasService.read(true).subscribe((response: any) => {
        console.log(response);
        this.perguntas = response.response;
      })
    })
  }
}
