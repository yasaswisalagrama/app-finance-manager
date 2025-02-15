import { Component, OnInit } from '@angular/core';
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
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
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
    NgxChartsModule]
})
export class AnalyticsComponent implements OnInit {
  // Sample data for charts
  pieChartData: any[] = [
    { name: 'Food', value: 500 },
    { name: 'Transport', value: 300 },
    { name: 'Entertainment', value: 200 }
  ];

  barChartData: any[] = [
    {
      name: 'Income',
      series: [
        { name: 'January', value: 1000 },
        { name: 'February', value: 1200 }
      ]
    },
    {
      name: 'Expense',
      series: [
        { name: 'January', value: 800 },
        { name: 'February', value: 900 }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}
