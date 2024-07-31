import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../models/admin';
import { SignUpService } from '../../../services/sign-up.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarAdminComponent } from '../../../components/public/sidebar-admin/sidebar-admin.component';

@Component({
  selector: 'app-perfil-admin',
  standalone: true,
  imports: [FormsModule, NgIf, SidebarAdminComponent],
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.scss']
})
export class PerfilAdminComponent implements OnInit {
  admin: Admin = {
    email: '',
    nome_admin: '',
    foto_perfil: '',
    cargo: '',
    senha: ''
  };
  isEditing: boolean = false;

  constructor(
    private signUpService: SignUpService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.signUpService.getAdminProfile().subscribe({
      next: (response) => {
        if (response.success) {
          this.admin = response.data;
        } else {
          this.snackBar.open('Nenhum perfil encontrado', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar perfil', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar']
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
            panelClass: ['success-snackbar']
          });
          this.toggleEdit();
        } else {
          this.snackBar.open('Erro ao atualizar perfil', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      },
      error: (error) => {
        this.snackBar.open('Erro ao atualizar perfil', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  navigateToAddAdmin(): void {
    this.router.navigate(['/sign-up']);
  }

}
