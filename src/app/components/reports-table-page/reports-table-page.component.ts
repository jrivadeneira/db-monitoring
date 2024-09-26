import { Component } from '@angular/core';
import { ReportsTableComponent } from '../reports-table/reports-table.component';
import { ReportService } from '../../services/report.service';
import { Schema } from '../../domain/schema';
import { AsyncPipe } from '@angular/common';
import { SchemaService } from '../../services/schema.service';
import { Router } from '@angular/router';
import {DbOptionsMenuComponent} from '../db-options-menu/db-options-menu.component';
import {DbOption} from '../db-table/DbOption';
@Component({
  selector: 'app-reports-table-page',
  standalone: true,
  imports: [ReportsTableComponent, AsyncPipe, DbOptionsMenuComponent],
  templateUrl: './reports-table-page.component.html',
  styleUrl: './reports-table-page.component.scss'
})
export class ReportsTablePageComponent {
  schemaSelections: DbOption[] = [];

  constructor(
    private reportService: ReportService,
    private schemaService: SchemaService,
    private router: Router,
  ){
    this.schemaService.schemaObservable.subscribe((schemas:Schema[]) => {
      this.schemaSelections = [];
      schemas.forEach((each: Schema)=>{
        const option = new DbOption(each.name,()=>this.createReport(each));
        this.schemaSelections.push(option)
      })
    });
  }

  createReport(schema: Schema) {
    this.reportService.setCurrentSchema(Schema.fromData(schema));
    this.router.navigate(["report-editor"]);
  }

  get schemas() {
    return this.schemaService.schemaObservable;
  }
}
