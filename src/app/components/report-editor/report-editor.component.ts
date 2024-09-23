import {NgForOf, NgIf} from '@angular/common';
import { Component, input, model } from '@angular/core';
import {Report} from '../../domain/report';
import {ReportService} from '../../services/report.service';
import {FormsModule, NgModel} from '@angular/forms';

@Component({
  selector: 'app-report-editor',
  standalone: true,
  imports: [NgForOf, NgIf, FormsModule],
  templateUrl: './report-editor.component.html',
  styleUrl: './report-editor.component.scss'
})
export class ReportEditorComponent {
  hideSaveButton = input(false);
  report = model<Report>();
  sampleReport = input<Report>();

  constructor(private reportService: ReportService){

  }

  save(){
    if(this.report() !== undefined){
      const repo = this.report() as Report;
      this.reportService.saveReport(repo);
    }
  }

  public get reportData(){
    if(this.report()!==undefined){
      return this.report();
    } else {
      return this.sampleReport();
    }
  }
}
