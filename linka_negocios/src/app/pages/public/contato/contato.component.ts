import { Component } from '@angular/core';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ContatoService } from '../../../services/contato.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [SidebarClienteComponent, FooterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent {
  showModal = false;
  contactForm: FormGroup;

  constructor(private contatoService: ContatoService, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      empresa: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      area_atuacao: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      mensagem: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(300)]]
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submitForm() {
    console.log(this.contactForm.value)
    if (this.contactForm.valid) {
      const contact = {
        nome: this.contactForm.value.nome,
        email: this.contactForm.value.email,
        telefone: this.contactForm.value.telefone,
        empresa: this.contactForm.value.empresa,
        area_atuacao: this.contactForm.value.area_atuacao,
        mensagem: this.contactForm.value.mensagem,
      };

      this.contatoService.addContato(contact).subscribe(
        response => {
          alert('Formulário enviado com sucesso!');
          this.closeModal();
          this.contactForm.reset();
        },
        error => {
          console.error('Erro ao enviar formulário:', error);
          alert('Houve um erro ao enviar o formulário. Por favor, tente novamente.');
        }
      );
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  applyPhoneMask(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 5) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else {
      value = value.replace(/^(\d*)/, '($1');
    }
    input.value = value;
  }
}
