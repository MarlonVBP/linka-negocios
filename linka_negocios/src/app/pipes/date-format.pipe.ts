import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Converter a string em um objeto Date
    const date = new Date(value);

    // Verificar se a data é válida
    if (isNaN(date.getTime())) return '';

    // Extrair os componentes da data
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses são baseados em zero
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Formatar a data no formato desejado
    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  }

}
