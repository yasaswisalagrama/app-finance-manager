import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../transactions/services/transaction.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule, CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

export interface Transaction {
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  updated_at: Date;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule, 
  ], providers: [DatePipe, CurrencyPipe, TitleCasePipe],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];
  totalIncome: number = 0;
  totalExpense: number = 0;
  balance: number = 0;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    // Subscribe to transactions and calculate the summary once the data is loaded
    this.transactionService.getTransactions().subscribe(
      (data: Transaction[]) => {
        this.transactions = data;
        this.calculateSummary();
      },
      error => {
        console.error('Error loading transactions:', error);
      }
    );
  }

  calculateSummary(): void {
    this.totalIncome = 0;
    this.totalExpense = 0;

    // Iterate over the loaded transactions
    this.transactions.forEach((transaction: Transaction) => {
      if (transaction.type === 'income') {
        this.totalIncome += transaction.amount;
      } else if (transaction.type === 'expense') {
        this.totalExpense += transaction.amount;
      }
    });

    this.balance = this.totalIncome - this.totalExpense;
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      food: 'restaurant',
      housing: 'home',
      transportation: 'directions_car',
      entertainment: 'sports_esports',
      utilities: 'flash_on',
      healthcare: 'local_hospital'
    };
    return icons[category.toLowerCase()] || 'category';
  }
}