import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics/analytics.component';
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    MatCardModule,
    NgxChartsModule,
    AnalyticsComponent
  ]
})
export class AnalyticsModule { }
