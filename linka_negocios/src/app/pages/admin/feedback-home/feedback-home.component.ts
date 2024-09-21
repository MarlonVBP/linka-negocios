import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MotivosEscolherEmpresaService } from '../../../services/motivos-escolher-empresa.service';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { avaliacaoHomeService } from '../../../services/avaliacao-home.service';


interface Motivos_Escolher_Empresa {
  id?: number;
  titulo: string;
  descricao: string;
  imagem: string;
}

@Component({
  selector: 'app-feedback-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarAdminComponent, MatIconModule],
  templateUrl: './feedback-home.component.html',
  styleUrl: './feedback-home.component.scss'
})
export class FeedbackHomeComponent {
  feedbacks: any[] = [];
  isModalOpen = false;
  isEditModalOpen = false;
  feedbackForm: FormGroup;
  editFeedbackForm: FormGroup;
  editingFeedbackId: number | null = null;
  stars = Array(5).fill(0);
  rating = 0;
  hoverState = 0;
  starsArray: number[] = Array.from({ length: 5 }, (_, i) => i + 1);
  formSubmitted = false; 

  private readonly fotoPerfilOptions = [
    'https://a.imagem.app/3C1Iiv.png',
    'https://a.imagem.app/3C1E3S.png',
    'https://a.imagem.app/3C1QIT.png'
  ];

  constructor(private fb: FormBuilder, private avaliacaoService: avaliacaoHomeService) {
    this.feedbackForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      mensagem: ['', [Validators.required, Validators.maxLength(200)]],
      avaliacao: [0, Validators.required],
      foto_perfil: [''] 
    });

    this.editFeedbackForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      mensagem: ['', [Validators.required, Validators.maxLength(200)]],
      avaliacao: [0, Validators.required],
      foto_perfil: ['']  
    });
  }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    this.avaliacaoService.getAvaliacaoes().subscribe({
      next: (response) => {
        this.feedbacks = response.data;
      },
      error: (err) => {
        Swal.fire('Erro', 'Erro ao carregar feedbacks', 'error');
      }
    });
  }

  reset() {
    this.hoverState = 0;
  }

  openModal() {
    this.isModalOpen = true;
    this.feedbackForm.reset();
  }

  closeModal() {
    this.isModalOpen = false;
  }

  rate(star: number) {
    this.rating = star;
    this.feedbackForm.patchValue({ avaliacao: star });
  }

  hover(star: number) {
    this.hoverState = star;
  }

  resetHover() {
    this.hoverState = 0;
  }

  selectRandomFotoPerfil(): string {
    const randomIndex = Math.floor(Math.random() * this.fotoPerfilOptions.length);
    return this.fotoPerfilOptions[randomIndex];
  }

  onSubmit() {
    this.formSubmitted = true;
  
    if (this.feedbackForm.valid) {
      const randomFotoPerfil = this.selectRandomFotoPerfil();
      this.feedbackForm.patchValue({ foto_perfil: randomFotoPerfil });
  
      const feedback = this.feedbackForm.value;
  
      this.avaliacaoService.addAvalicao(feedback).subscribe({
        next: response => {
          this.feedbacks.push({ ...feedback, id: response.id }); 

          console.log('Feedback enviado:', feedback);

  
          Swal.fire({
            text: 'Seu feedback foi enviado com sucesso.',
            imageUrl: 'https://a.imagem.app/3ubzQX.png',
            imageWidth: 80,
            imageHeight: 80,
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'custom-confirm-button'
            }
          });
  
          this.resetForm();
          this.closeModal();
        },
        error: err => {
          console.error('Erro ao enviar feedback:', err);
          Swal.fire({
            title: 'Erro!',
            text: 'Ocorreu um problema ao enviar seu feedback. Tente novamente.',
            imageUrl: 'https://a.imagem.app/3ubYKQ.png',
            imageWidth: 80,
            imageHeight: 80,
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'custom-confirm-button'
            }
          });
        }
      });
    }
  }
  

  resetForm() {
    this.feedbackForm.reset({
      nome: '',
      mensagem: '',
      avaliacao: 0,
      imagem: ''
    });
    this.rating = 0;
    this.hoverState = 0;
    this.formSubmitted = false;
  }

  openEditModal(feedback: any) {
    this.isEditModalOpen = true;
    this.editFeedbackForm.patchValue(feedback);
    this.editingFeedbackId = feedback.id;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  onEditSubmit() {
    if (this.editFeedbackForm.valid && this.editingFeedbackId !== null) {
      const randomFotoPerfil = this.selectRandomFotoPerfil();
      this.editFeedbackForm.patchValue({ foto_perfil: randomFotoPerfil });
      const updatedFeedback = { id: this.editingFeedbackId, ...this.editFeedbackForm.value };

      this.avaliacaoService.updateAvaliacao(updatedFeedback).subscribe({
        next: () => {
          Swal.fire('Sucesso!', 'Feedback atualizado com sucesso.', 'success');
          this.loadFeedbacks();
          this.closeEditModal();
        },
        error: () => {
          Swal.fire('Erro', 'Erro ao atualizar feedback.', 'error');
        }
      });
    }
  }

  deleteFeedback(id: number) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Não será possível reverter esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      customClass: {
        confirmButton: 'custom-confirm-button'
      },
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.avaliacaoService.deleteAvaliacao(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Excluído!',
              text: 'Feedback excluído com sucesso.',
              icon: 'success',
              customClass: {
                confirmButton: 'custom-confirm-button'  
              }
            });
            this.loadFeedbacks();
          },
          error: () => {
            Swal.fire('Erro', 'Erro ao excluir feedback.', 'error');
          }
        });
      }
    });
  }
}
