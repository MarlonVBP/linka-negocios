import {
  Component,
  inject,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { InsightsSidebarComponent } from '../../../components/public/insights-sidebar/insights-sidebar.component';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../../services/posts.service';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { ComentariosService } from '../../../services/comentarios.service';
import { FormBuilder } from '@angular/forms';
import { Comentario } from '../../../models/comentario';
import { ApiResponse } from '../../../models/api-response';
import { MatDialog } from '@angular/material/dialog';
import { ModalAvaliacoesComponent } from '../../../components/public/modal-avaliacoes/modal-avaliacoes.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { ShareButtonComponent } from '../../../components/public/share-button/share-button.component';
import { AvaliacoesComponent } from '../../../components/public/avaliacoes/avaliacoes.component';
import { IconeWhatsappComponent } from '../../../components/public/icone-whatsapp/icone-whatsapp.component';
import Swal from 'sweetalert2';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { RecaptchaService } from '../../../services/recaptcha/recaptcha.service';
import { ConsoleAlertService } from '../../../services/console-alert.service';

@Component({
  selector: 'app-insights-list-post',
  standalone: true,
  imports: [
    InsightsSidebarComponent,
    FooterComponent,
    ReactiveFormsModule,
    CommonModule,
    ShareButtonComponent,
    AvaliacoesComponent,
    IconeWhatsappComponent,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LezRUYqAAAAAO8_eWajdoIMOJPWKbREv9208PeC',
      } as RecaptchaSettings,
    },
  ],
  templateUrl: './insights-list-post.component.html',
  styleUrls: ['./insights-list-post.component.scss'],
})
export class InsightsListPostComponent implements OnInit {
  @ViewChild('messageRating') messageRatingRef!: ElementRef<HTMLSpanElement>;
  post: any;

  postagem_id: number = 0;

  comentarios: any[] = [];

  stars: boolean[] = Array(5).fill(false);
  rating = 0;
  hoverState = 0;
  rating_post: string = '';

  sanitizedContent: SafeHtml = '';

  apiUrl = environment.apiUrl + '/public/posts/';

  comentariosForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    conteudo: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(200),
    ]),
    profissao: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    empresa: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
  });

  currentUrl: string = '';
  text: string = '';
  shareTitle: string = '';

  constructor(
    private postsService: PostsService,
    private comentariosService: ComentariosService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private _recaptchaService: RecaptchaService,
    private alerMensage: ConsoleAlertService
  ) {
    this.comentariosForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      conteudo: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(200),
      ]),
      profissao: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      empresa: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
    });

    if (window.location.hostname !== 'localhost') {
      this.currentUrl =
        window.location.hostname + '/read-more/' + this.postagem_id;
    }
    this.alerMensage.alertFunction();
  }

  ngOnInit(): void {
    this.loadPost();
  }

  openModal(): void {
    this.dialog.open(ModalAvaliacoesComponent, {
      minWidth: '70vw',
      height: '70vh',
      panelClass: 'custom-dialog-container',
      data: this.comentarios,
    });
  }

  loadPost(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = +params.get('id')!;
      console.log('ID do post:', postId);

      this.postagem_id = postId;

      if (postId) {
        this.postsService.getPostById(postId).subscribe((response: any) => {
          this.post = response.data[0];
          console.log('Post carregado:', this.post);

          // Sanitizar o conteúdo do post
          this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(
            this.post.conteudo
          );
          this.text += encodeURIComponent(
            `Confira este artigo incrível! 🚀 - ${this.post.titulo}  #notícias #tecnologia`
          );

          this.shareTitle = this.post.titulo;
        });

        this.comentariosService
          .read_post(this.postagem_id)
          .subscribe((response: any) => {
            this.comentarios = response.response;
            console.log(response.response);
          });
      } else {
        console.error('ID do post não encontrado na URL');
      }
    });
  }

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

    this.rating_post = '';
    for (let i = 1; i <= 5; i++) {
      this.rating_post += this.rating >= i ? '&#9733;' : '&#9734;';
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
        id: this.postagem_id,
        email: this.comentariosForm.value.email,
        nome: this.comentariosForm.value.nome,
        conteudo: this.comentariosForm.value.conteudo,
        profissao: this.comentariosForm.value.profissao,
        empresa: this.comentariosForm.value.empresa,
        avaliacao: this.rating,
        recaptcha: this.recaptchaToken,
      };

      this.comentariosService.create_post(comentario).subscribe(
        () => {
          this.comentariosService
            .read_post(this.postagem_id)
            .subscribe((response: any) => {
              this.comentarios = response.response;
            });
          Swal.fire({
            text: 'Comentário enviado!',
            imageUrl: 'https://a.imagem.app/3ubzQX.png',
            imageWidth: 80,
            imageHeight: 80,
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'custom-confirm-button',
            },
          });
          this.comentariosForm.reset();
        },
        (error) => {
          console.error('Erro ao criar comentário:', error);
          Swal.fire({
            text: 'Houve um problema ao enviar seu comentário, tente novamente.',
            imageUrl: 'https://a.imagem.app/3ubYKQ.png',
            imageWidth: 80,
            imageHeight: 80,
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'custom-confirm-button',
            },
          });
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
