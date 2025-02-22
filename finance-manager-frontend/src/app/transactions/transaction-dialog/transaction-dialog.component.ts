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
import { PdfParserService } from '../services/pdf-parser.service';
import { CommonModule, NgIf } from '@angular/common';

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
    private pdfParser: PdfParserService,
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
      
      this.pdfParser.parsePdf(file).then(transactions => {
        if (transactions.length > 0) {
          const latest = transactions[0];
          this.transactionForm.patchValue({
            amount: latest.amount,
            category: latest.category,
            type: latest.type,
            description: latest.description
          });
        }
        this.isProcessing = false;
      }).catch(error => {
        console.error('PDF processing error:', error);
        this.isProcessing = false;
      });
    }
  }

  onSave(): void {
    if (this.transactionForm.valid) {
      const transactionData = {
        ...this.transactionForm.value,
        date: new Date()
      };
      this.dialogRef.close(transactionData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}