import {NgForOf, NgIf} from '@angular/common';
import { Component, input, model } from '@angular/core';
import {Report} from '../../domain/report';

@Component({
  selector: 'app-report-editor',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './report-editor.component.html',
  styleUrl: './report-editor.component.scss'
})
export class ReportEditorComponent {
  report = model<Report>();
  constructor(){

  }
  save(){}
}
