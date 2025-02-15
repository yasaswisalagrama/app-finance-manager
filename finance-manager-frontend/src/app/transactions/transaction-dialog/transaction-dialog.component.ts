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

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss'],
  imports: [MatCardModule,
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
      ReactiveFormsModule]
})
export class TransactionDialogComponent implements OnInit {
  transactionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      amount: [this.data.transaction ? this.data.transaction.amount : '', Validators.required],
      category: [this.data.transaction ? this.data.transaction.category : '', Validators.required],
      type: [this.data.transaction ? this.data.transaction.type : 'Expense', Validators.required],
      description: [this.data.transaction ? this.data.transaction.description : '']
    });
  }

  onSave(): void {
    if (this.transactionForm.valid) {
      this.dialogRef.close(this.transactionForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
