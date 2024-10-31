import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../models/admin';
import { SignUpService } from '../../../services/sign-up.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-admin',
  standalone: true,
  imports: [FormsModule, NgIf, SidebarAdminComponent],
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.scss'],
})
export class PerfilAdminComponent implements OnInit {
  admin: Admin = {
    email: '',
    nome_admin: '',
    foto_perfil: '',
    cargo: '',
    senha: '',
  };
  isEditing: boolean = false;

  idAdmin: any = '';

  constructor(
    private signUpService: SignUpService,
    private snackBar: MatSnackBar,
    private router: Router,
    private servicoDeLogin: LoginService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }
  
  loadProfile(): void {
    this.signUpService.getAdminProfile().subscribe({
      next: (response) => {
        if (response.success) {
          console.log(response);

          const randomImageNumber = Math.floor(Math.random() * 6) + 1;
          const randomImagePath = `/images/png/user-${randomImageNumber}.png`;

          this.admin = {
            ...response.data,
            foto_perfil: response.data.foto_perfil
              ? response.data.foto_perfil
              : randomImagePath,
          };

          this.idAdmin = response.data.id;
          console.log(response);
        } else {
          this.snackBar.open('Nenhum perfil encontrado', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        }
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar perfil', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  toggleDelete(): void {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Não será possível reverter esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      customClass: {
        confirmButton: 'custom-confirm-button',
      },
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.signUpService.delete(this.idAdmin).subscribe({
          next: () => {
            Swal.fire({
              title: 'Excluído!',
              text: 'Perfil excluído com sucesso.',
              icon: 'success',
              customClass: {
                confirmButton: 'custom-confirm-button',
              },
            });
            this.loadProfile();
            this.navigateToAddAdmin();
            this.servicoDeLogin.deslogar();
          },
          error: () => {
            Swal.fire('Erro', 'Erro ao excluir o perfil.', 'error');
          },
        });
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  updateProfile(): void {
    this.signUpService.updateProfile(this.admin).subscribe({
      next: (response) => {
        if (response.success) {
          this.snackBar.open('Perfil atualizado com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          this.toggleEdit();
        } else {
          this.snackBar.open('Erro ao atualizar perfil', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        }
      },
      error: (error) => {
        this.snackBar.open('Erro ao atualizar perfil', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  navigateToAddAdmin(): void {
    this.router.navigate(['/sign-up']);
  }
}
