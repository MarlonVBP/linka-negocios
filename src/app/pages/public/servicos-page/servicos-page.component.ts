import { Component, ElementRef, ViewChild } from '@angular/core';
import { SidebarClienteComponent } from '../../../components/public/sidebar-cliente/sidebar-cliente.component';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { ServicosCarouselComponent } from '../../../components/public/servicos-carousel/servicos-carousel.component';
import { ModalAvaliacoesComponent } from '../../../components/public/modal-avaliacoes/modal-avaliacoes.component';
import { MatDialog } from '@angular/material/dialog';
import { ComentariosService } from '../../../services/comentarios.service';
import { Comentario } from '../../../models/comentario';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SpinnerComponent } from '../../../components/public/spinner/spinner.component';
import { AvaliacoesComponent } from '../../../components/public/avaliacoes/avaliacoes.component';
import { IconeWhatsappComponent } from '../../../components/public/icone-whatsapp/icone-whatsapp.component';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { RecaptchaService } from '../../../services/recaptcha/recaptcha.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { ConsoleAlertService } from '../../../services/console-alert.service';
import { ContactFormComponent } from '../../../components/public/contact-form/contact-form.component';

@Component({
  selector: 'app-servicos-page',
  standalone: true,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }), // Começa invisível e levemente deslocado para baixo
        animate(
          '0.5s ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ), // Anima para ficar visível e retornar à posição original
      ]),
    ]),
  ],
  imports: [
    SidebarClienteComponent,
    FooterComponent,
    ServicosCarouselComponent,
    CommonModule,
    ReactiveFormsModule,
    SpinnerComponent,
    RecaptchaModule,
    RecaptchaFormsModule,
    AvaliacoesComponent,
    IconeWhatsappComponent,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LezRUYqAAAAAO8_eWajdoIMOJPWKbREv9208PeC',
      } as RecaptchaSettings,
    },
  ],
  templateUrl: './servicos-page.component.html',
  styleUrls: ['./servicos-page.component.scss'], // Corrigido 'styleUrl' para 'styleUrls'
})
export class ServicosPageComponent {
  @ViewChild('messageRating') messageRatingRef!: ElementRef<HTMLSpanElement>;

  private pagina_id: number = 2;

  stars: boolean[] = Array(5).fill(false);
  rating = 0;
  hoverState = 0;
  rating_post: string = '';

  avaliacoes: Comentario[] = [];

  load_spinner: boolean = false;

  constructor(
    public dialog: MatDialog,
    private comentariosService: ComentariosService,
    private _recaptchaService: RecaptchaService,
    private alerMensage: ConsoleAlertService
  ) {
    this.comentariosService.read_pag(2).subscribe((response: any) => {
      if (response.success) {
        this.avaliacoes = response.response;
        console.log(this.avaliacoes);
        return;
      }
      this.avaliacoes = [];
    });
    this.alerMensage.alertFunction();
  }

  comentariosForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    conteudo: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(200),
    ]),
    profissao: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    empresa: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
  });

  getErrorMessage(controlName: string): string {
    const control = this.comentariosForm.get(controlName);
    if (control && control.invalid && (control.dirty || control.touched)) {
      if (control.errors?.['required']) {
        return 'Campo obrigatório';
      }
      if (control.errors?.['email']) {
        return 'Email inválido';
      }
      if (control.errors?.['minlength']) {
        return `O campo deve ter no mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      }
      if (control.errors?.['maxlength']) {
        return `O campo deve ter no máximo ${control.errors['maxlength'].requiredLength} caracteres`;
      }
    }
    return '';
  }

  async submitApplication(): Promise<void> {
    if (this.comentariosForm.invalid) {
      this.comentariosForm.markAllAsTouched();
      return;
    }

    if (this.rating < 1 || this.rating > 5) {
      this.messageRatingRef.nativeElement.classList.add('show');
      setTimeout(() => {
        this.messageRatingRef.nativeElement.classList.remove('show');
      }, 1000);
      return;
    }

    try {
      // Aguarda o token do reCAPTCHA
      this.recaptchaToken = await this.gerarTokenReCaptcha();

      const comentario = {
        id: this.pagina_id,
        email: this.comentariosForm.value.email,
        user_name: this.comentariosForm.value.nome,
        conteudo: this.comentariosForm.value.conteudo,
        profissao: this.comentariosForm.value.profissao,
        empresa: this.comentariosForm.value.empresa,
        avaliacao: this.rating,
        recaptcha: this.recaptchaToken,
      };

      // Envia os dados após receber o token
      this.comentariosService.create_pag(comentario).subscribe(
        (response: any) => {
          if (response.success === 1) {
            this.closeModalForm();
            this.comentariosForm.reset();
            this.comentariosService
              .read_pag(this.pagina_id)
              .subscribe((resp: any) => {
                this.avaliacoes = resp.response;
              });
          } else {
            console.error('Erro retornado pela API:', response.message);
          }
        },
        (error) => {
          console.error('Erro na requisição:', error);
        }
      );
    } catch (error) {
      console.error('Erro ao gerar token reCAPTCHA:', error);
    }
  }

  rate(rating: number): void {
    this.rating = rating;
    console.log('Avaliação selecionada:', this.rating);
  }

  hover(index: number): void {
    this.hoverState = index;
  }

  reset(): void {
    this.hoverState = 0;
  }

  isModalOpen = false;

  openModalForm() {
    this.isModalOpen = true;
  }

  closeModalForm() {
    this.isModalOpen = false;
  }

  openContactModal(): void {
    this.dialog.open(ContactFormComponent, {
      minWidth: 'auto',
      height: 'auto',
      panelClass: 'custom-dialog-container',
    });
  }

  openModal(): void {
    this.dialog.open(ModalAvaliacoesComponent, {
      minWidth: '70vw',
      height: '70vh',
      panelClass: 'custom-dialog-container',
      data: this.avaliacoes,
    });
  }

  private recaptchaToken: string = '';

  async gerarTokenReCaptcha(): Promise<string> {
    try {
      const token = await this._recaptchaService.executeRecaptcha('homepage');
      return token;
    } catch (error) {
      return '';
    }
  }
}
