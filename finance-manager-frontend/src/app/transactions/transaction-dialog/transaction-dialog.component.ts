// transaction-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule, NgIf } from '@angular/common';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    CommonModule,
  ]
})
export class TransactionDialogComponent implements OnInit {
  transactionForm: FormGroup;
  selectedFile: File | null = null;
  isProcessing = false;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    public dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { transaction: any }
  ) {
    this.transactionForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      type: ['expense', Validators.required],
      description: [''],
      pdf: [null]
    });
  }

  ngOnInit(): void {
    if (this.data.transaction) {
      this.transactionForm.patchValue({
        amount: this.data.transaction.amount,
        category: this.data.transaction.category,
        type: this.data.transaction.type,
        description: this.data.transaction.description
      });
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.isProcessing = true;

      // Prepare FormData to send the PDF file to the backend.
      const formData = new FormData();
      formData.append('pdf', file);
      
      // Optionally, add other form fields if needed.
      // For example: formData.append('transactionId', '12345');

      // Immediately send the file to the backend.
      this.transactionService.addTransaction(formData).subscribe(
        (response) => {
          console.log('PDF sent successfully:', response);
          // Optionally, update the form with details returned from backend.
          if (response && response.transaction) {
            const transaction = response.transaction;
            this.transactionForm.patchValue({
              amount: transaction.amount,
              category: transaction.category,
              type: transaction.type,
              description: transaction.description,
            });
          }
          this.isProcessing = false;
        },
        (error) => {
          console.error('Error sending PDF:', error);
          this.isProcessing = false;
        }
      );
    }
  }

  onSave(): void {
    // If you have additional details to save along with the transaction,
    // you can use this method to close the dialog with the form data.
    if (this.transactionForm.valid) {
      this.dialogRef.close(this.transactionForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
