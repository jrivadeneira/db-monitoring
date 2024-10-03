import { Component, signal } from '@angular/core';
import { ReportEditorComponent } from '../report-editor/report-editor.component';
import { Report } from '../../domain/report';
import { Schema } from '../../domain/schema';
import { ReportService } from '../../services/report.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-reports-editor-page',
  standalone: true,
  imports: [ReportEditorComponent],
  templateUrl: './reports-editor-page.component.html',
  styleUrl: './reports-editor-page.component.scss'
})
export class ReportsEditorPageComponent {
  currentReport = signal(Report.createFromSchema(Schema.createEmptySchema()));
  constructor(
    reportService: ReportService,
  ){
    reportService.currentReportObservable.pipe(take(1)).subscribe((report: Report) => {
      this.currentReport.update(()=>{

        return Report.fromData(report);
      })
    });
  }
}
