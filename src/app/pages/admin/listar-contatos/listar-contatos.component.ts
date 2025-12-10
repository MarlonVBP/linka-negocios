import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ContatoService } from '../../../services/contato.service';
import { CommonModule, NgFor } from '@angular/common';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { DateFormatPipe } from '../../../pipes/date-format.pipe';
import { PhoneFormatPipe } from '../../../pipes/phone-format.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-listar-contatos',
    imports: [NgFor, SidebarAdminComponent, DateFormatPipe, PhoneFormatPipe, MatCheckboxModule, CommonModule],
    templateUrl: './listar-contatos.component.html',
    styleUrls: ['./listar-contatos.component.scss']
})
export class ListarContatosComponent implements OnInit {
  contatos: any[] = [];
  isModalOpen: boolean = false;
  selectedContato: any = null;

  contatosVistos: number[] = [];
  selecionarTodos: boolean = false;

  constructor(
    private contatoService: ContatoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getContatos();
  }

  getContatos(): void {
    this.contatoService.getContatos().subscribe(data => {
      if (data.success) {
        this.contatos = data.contatos;
        console.log(this.contatos);
        this.cdr.detectChanges();
      } else {
        console.error(data.message);
      }
    });
  }

  marcarComoVisto(number: number) {
    const index = this.contatosVistos.indexOf(number);

    if (!this.contatosVistos.includes(number)) {
      this.contatosVistos.push(number);
      console.log(this.contatosVistos);
      return;
    }
    this.contatosVistos.splice(index, 1);
    console.log(this.contatosVistos);
  }

  selecionarTodosContatos(bool: boolean) {
    this.selecionarTodos = bool;
    if (bool) {
      this.contatosVistos = this.contatos.map(comentario => comentario.id);
      console.log(this.contatosVistos);
      return;
    }
    this.contatosVistos = [];
    console.log(this.contatosVistos);
  }

  marcarContatos(ids: number[]) {
    this.contatoService.mark_contacts_as_getContatos(ids).subscribe(
      (response: any) => {
        console.log(response);
        if (response.success) {
          this.contatoService.getContatos().subscribe((response: any) => {
            if (response.success) {
              this.contatos = response.contatos;
              this.cdr.detectChanges();
            }
          });
        }
      }
    )
  }

  openModal(contato: any): void {
    this.selectedContato = contato;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedContato = null;
  }

  formatPhoneForWhatsApp(phone: string | null): string {
    if (phone) {
      return phone.replace(/\D/g, '');
    }
    return '';
  }


  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
