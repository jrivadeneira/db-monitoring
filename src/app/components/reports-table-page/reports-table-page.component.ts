import { Component } from '@angular/core';
import { ReportsTableComponent } from '../reports-table/reports-table.component';
import { ReportService } from '../../services/report.service';
import { Schema } from '../../domain/schema';
import { AsyncPipe } from '@angular/common';
import { SchemaService } from '../../services/schema.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-reports-table-page',
  standalone: true,
  imports: [ReportsTableComponent, AsyncPipe],
  templateUrl: './reports-table-page.component.html',
  styleUrl: './reports-table-page.component.scss'
})
export class ReportsTablePageComponent {

  constructor(
    private reportService: ReportService,
    private schemaService: SchemaService,
    private router: Router,
  ) {

  }

  createReport(schema: Schema) {
    this.reportService.setCurrentSchema(schema);
    this.router.navigate(["report-editor"]);
  }

  get schemas() {
    return this.schemaService.schemaObservable;
  }
}
