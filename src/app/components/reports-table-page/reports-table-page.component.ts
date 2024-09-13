import { Component, signal } from '@angular/core';
import {ReportsTableComponent} from '../reports-table/reports-table.component';
import {ReportService} from '../../services/report.service';
import { take } from "rxjs/operators";
import {Report} from '../../domain/report';
@Component({
  selector: 'app-reports-table-page',
  standalone: true,
  imports: [ReportsTableComponent],
  templateUrl: './reports-table-page.component.html',
  styleUrl: './reports-table-page.component.scss'
})
export class ReportsTablePageComponent {
  reports!: Report[];

  constructor(private reportService: ReportService){
    this.refresh();
  }
  refresh(){
    this.reportService.getReportsObservable().pipe(take(1)).subscribe((reports:Report[]) => {
      this.reports = reports;
    });
  }
}
