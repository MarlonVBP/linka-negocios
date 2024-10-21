import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Remover caracteres não numéricos
    const cleaned = value.replace(/\D/g, '');

    // Verificar se o número tem o comprimento esperado
    if (cleaned.length !== 11) return value;

    // Aplicar a formatação no número
    const ddd = cleaned.slice(0, 2);
    const firstPart = cleaned.slice(2, 7);
    const secondPart = cleaned.slice(7);

    return `(${ddd}) ${firstPart}-${secondPart}`;
  }

}
