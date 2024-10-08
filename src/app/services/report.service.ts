import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ajax } from "rxjs/ajax";
import { take, Observable } from "rxjs";
import { Report } from '../domain/report';
import { Schema } from '../domain/schema';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private reportsSubject: BehaviorSubject<Report[]> = new BehaviorSubject<Report[]>([]);

  private reportSubject: BehaviorSubject<Report> = new BehaviorSubject(Report.createEmpty());

  constructor() {
    this.getReports();
  }

  getReports(): void {
    ajax.getJSON<Report[]>("http://localhost:5000/report").pipe(take(1)).subscribe((reports: Report[]) => {
      const newReports = reports.map((each:Report) => {
        return Report.clone(each);
      });
      console.log('reports: ', newReports);
      this.reportsSubject.next(newReports);
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
    return this.reportsSubject.asObservable();
  }

  setCurrentSchema(schema: Schema){
    const report = Report.createFromSchema(schema);
    this.reportSubject.asObservable().pipe(take(1)).subscribe(() => {
        console.log("Updated Schema: ", schema)
        this.reportSubject.next(report);
    });
    console.log(schema);
  }

  get currentReportObservable(): Observable<Report>{
    return this.reportSubject.asObservable();
  }

  updateReports(report: Report){
    this.reportsSubject.asObservable().pipe(take(1)).subscribe((reports: Report[]) => {
      reports.push(Report.fromData(report));
      this.reportsSubject.next(reports);
    });
  }

  setCurrentReport(report: Report) {
    this.reportSubject.next(report);
  }
}
