import { Component, signal } from '@angular/core';
import { SchemaService } from '../../services/schema.service';
import { Schema } from '../../domain/schema';
import { Observable } from 'rxjs';
import { NgForOf, NgIf } from '@angular/common';
import { ReportService } from '../../services/report.service';
import { Report } from '../../domain/report';
import { DbTableComponent } from '../db-table/db-table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports-table',
  standalone: true,
  imports: [NgForOf, NgIf, DbTableComponent],
  templateUrl: './reports-table.component.html',
  styleUrl: './reports-table.component.scss'
})
export class ReportsTableComponent {
  schemas = signal<Schema[]>([]);

  constructor(
    private schemaService: SchemaService,
    private reportService: ReportService,
    private router: Router,
  ) {
  }

  get reportDataObservable(): Observable<Report[]> {
    return this.reportService.getReportsObservable();
  }

  createNewReport(schema: Schema) {
    this.reportService.setCurrentSchema(schema);
    this.router.navigate(["report-editor"]);
  }

  createFrom(report: Report): Report {
    return Report.createFromExisting(report);
  }
}
