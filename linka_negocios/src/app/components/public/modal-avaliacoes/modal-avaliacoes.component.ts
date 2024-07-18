import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-avaliacoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-avaliacoes.component.html',
  styleUrl: './modal-avaliacoes.component.scss'
})
export class ModalAvaliacoesComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalAvaliacoesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){ }

  onClose(): void {
    this.dialogRef.close();
  }
}