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
      console.log("Reports: ", reports);
      this.reportSubject.next(reports);
    });
  }

  getReportsObservable(): Observable<Report[]> {
    return this.reportSubject.asObservable();
  }

  setCurrentSchema(schema: Schema){
    this.schemaSubject.next(schema);
  }

  get currentSchemaObservable(): Observable<Schema>{
    return this.schemaSubject.asObservable();
  }
}
