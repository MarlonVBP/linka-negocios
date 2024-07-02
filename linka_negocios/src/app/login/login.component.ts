import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  applyForm = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl(''),
  });

  constructor(private LoginService: LoginService) { }


  submitApplication() {
    this.LoginService.submitApplication(
      this.applyForm.value.email ?? '',
      this.applyForm.value.senha ?? '',
    );
  }

}

