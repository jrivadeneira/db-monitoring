import { CommonModule, Location, NgForOf, NgIf } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { Report } from '../../domain/report';
import { ReportService } from '../../services/report.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-editor',
  standalone: true,
  imports: [NgForOf, NgIf, FormsModule, CommonModule],
  templateUrl: './report-editor.component.html',
  styleUrl: './report-editor.component.scss'
})
export class ReportEditorComponent {
  hideSaveButton = input(false);
  report = model<Report>();
  sampleReport = input<Report>();

  constructor(private reportService: ReportService, private _location: Location) {

  }

  save() {
    if (this.report() !== undefined) {
      const repo = this.report() as Report;
      this.reportService.saveReport(repo);
      this._location.back();
    }
  }
cancel(){
  //navigate back to the previous page
  this._location.back();

}
  public get reportData() {
    if (this.report() !== undefined) {
      return this.report();
    } else {
      return this.sampleReport();
    }
  }
}
