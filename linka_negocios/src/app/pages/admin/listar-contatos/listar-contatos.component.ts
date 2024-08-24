import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ContatoService } from '../../../services/contato.service';
import { NgFor } from '@angular/common';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { DateFormatPipe } from '../../../pipes/date-format.pipe';
import { PhoneFormatPipe } from '../../../pipes/phone-format.pipe';

@Component({
  selector: 'app-listar-contatos',
  standalone: true,
  imports: [NgFor, SidebarAdminComponent, DateFormatPipe, PhoneFormatPipe],
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.scss']
})
export class ListarContatosComponent implements OnInit {
  contatos: any[] = [];
  isModalOpen: boolean = false;
  selectedContato: any = null;

  constructor(
    private contatoService: ContatoService,
    private cdr: ChangeDetectorRef 
  ) {}

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
