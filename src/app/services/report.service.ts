import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ajax } from "rxjs/ajax";
import { take, Observable } from "rxjs";
import { Report } from '../domain/report';
import {Schema} from '../domain/schema';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private reportSubject: BehaviorSubject<Report[]> = new BehaviorSubject<Report[]>([]);

  private schemaSubject: BehaviorSubject<Schema> = new BehaviorSubject(Schema.createEmptySchema());


  constructor() {
    this.getReports();
  }

  getReports(): void {
    ajax.getJSON<Report[]>("http://localhost:5000/report").pipe(take(1)).subscribe((reports: Report[]) => {
      const newReports = reports.map((each:Report) => {
        return Report.clone(each);
      });
      console.log('reports: ', newReports);
      this.reportSubject.next(newReports);
    });
  }

  saveReport(report: Report){
    console.log("report: ", report);
    return ajax.post<Report>("http://localhost:5000/report",report)
    .subscribe((each: any) => {
      const responseReport = each.response;
      this.updateReports(responseReport);
    });
  }

  getReportsObservable(): Observable<Report[]> {
    return this.reportSubject.asObservable();
  }

  setCurrentSchema(schema: Schema){
    this.schemaSubject.asObservable().pipe(take(1)).subscribe((currentSchema: Schema) => {
      if(!currentSchema.equals(schema)) {
        console.log("Updated Schema: ", schema)
        this.schemaSubject.next(schema);
      }
    });
    console.log(schema);
  }

  get currentSchemaObservable(): Observable<Schema>{
    return this.schemaSubject.asObservable();
  }

  updateReports(report: Report){
    this.reportSubject.asObservable().pipe(take(1)).subscribe((reports: Report[]) => {
      reports.push(report);
      this.reportSubject.next(reports);
    });
  }
}
