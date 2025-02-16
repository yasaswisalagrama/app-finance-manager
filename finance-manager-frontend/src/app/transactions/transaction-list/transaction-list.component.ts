import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { TransactionDialogComponent } from '../transaction-dialog/transaction-dialog.component';
import { AppModule } from '../../app.module';
import { TransactionsModule } from '../transactions.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
 

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
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
    CommonModule,
    MatChipsModule,
  ]
})
export class TransactionListComponent implements OnInit {
  transactions: any[] = [];

  constructor(private transactionService: TransactionService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe(data => {
      this.transactions = data;
    });
  }

  openAddTransactionDialog(): void {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '400px',
      data: { transaction: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transactionService.addTransaction(result).subscribe(() => this.loadTransactions());
      }
    });
  }
}
