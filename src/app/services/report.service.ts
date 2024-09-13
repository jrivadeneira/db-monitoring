import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ajax } from "rxjs/ajax";
import { take, Observable } from "rxjs";
import { Report } from '../domain/report';
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private reportSubject: BehaviorSubject<Report[]> = new BehaviorSubject<Report[]>([]);

  constructor() {
    this.getReports();
  }

  getReports(): void {
    ajax.getJSON<Report[]>("http://localhost:5000/report").pipe(take(1)).subscribe((reports: Report[]) => {
      this.reportSubject.next(reports);
    });
  }

  getReportsObservable(): Observable<Report[]> {
    return this.reportSubject.asObservable();
  }
}
