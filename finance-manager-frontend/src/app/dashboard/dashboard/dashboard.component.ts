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


interface Transaction {
  date: string;
  amount: number;
  category: string;
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
})
export class DashboardComponent implements OnInit {
  transactions: any;

  constructor(private transactionService: TransactionService) {}

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      food: 'restaurant',
      housing: 'home',
      transportation: 'directions_car',
      entertainment: 'sports_esports',
      utilities: 'flash_on',
      healthcare: 'local_hospital',
      // Add more mappings as needed
    };
    return icons[category.toLowerCase()] || 'category';
  }

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe(data => {
      this.transactions = data;
    });
  }
}