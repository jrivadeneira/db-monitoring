import { Component, signal } from '@angular/core';
import { Schema } from '../../domain/schema';
import { map, Observable } from 'rxjs';
import { NgForOf, NgIf } from '@angular/common';
import { ReportService } from '../../services/report.service';
import { Report, ReportField } from '../../domain/report';
import { DbTableComponent } from '../db-table/db-table.component';
import { Router } from '@angular/router';
import { DbOption } from '../db-table/DbOption';

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
    private reportService: ReportService,
    private router: Router,
  ) {
  }

  // Adding table options here!
  get reportDataObservable(): Observable<any[]> {
    return this.reportService.getReportsObservable().pipe(map((reports: Report[]) => {
      reports.forEach((each: Report) => {
        if(each.tableOptions) {
          const createFromThisReport = new DbOption(
            "Create From",
            (info: Report) => {
              this.createFrom(info)
            },
            each);
            each.tableOptions = [] as DbOption[];
            each.tableOptions.push(createFromThisReport);
        }
      });
      return reports.map((each:Report) => {
        const date = each.fields.find((eachField: ReportField) => {
          return eachField.name.toString().toLowerCase() === "date";
          })?.value;
        const study = each.fields.find((eachField: ReportField) => {
          return eachField.name.toString().toLowerCase() === "study";
          })?.value;
        const site = each.fields.find((eachField: ReportField) => {
          return eachField.name.toString().toLowerCase() === "site";
          })?.value;
        return {
          "Report Id": each.id,
          "Report Type" : each.name,
          "Date": date,
          "Study": study,
          "Site": site,
          "" : each.tableOptions
        }
      });
    }));
  }

  createNewReport(schema: Schema) {
    this.reportService.setCurrentSchema(schema);
    this.router.navigate(["report-editor"]);
  }

  createFrom(report: Report) {
    const newReport: Report = Report.createFromExisting(report);
    this.reportService.setCurrentReport(newReport);
    this.router.navigate(["report-editor"]);
  }
}
