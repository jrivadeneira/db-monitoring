import { Component, model, signal } from '@angular/core';
import { SchemaField } from '../../domain/schema';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { DragDropModule, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop'

@Component({
  selector: 'report-field-editor-modal',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    DragDropModule,
  ],
  templateUrl: './report-field-editor-modal.component.html',
  styleUrl: './report-field-editor-modal.component.scss'
})
export class ReportFieldEditorModalComponent {
  selectedRuleField = model<SchemaField>(SchemaField.createEmpty());
  fieldList = signal<any>({});

  rows: { label: string, value: string }[] = [{ label: '', value: '' }];
  Cindex= 0;
  isHovered = false;
  addClass(index:any){
    this.Cindex = index;
    this.isHovered = true;
  }

  removeClass(index:any){
    this.Cindex = index;
    this.isHovered = false;
  }

  addRow() {
    this.rows.push({ label: '', value: '' });
  }

  deleteRow(index: number) {
    this.rows.splice(index, 1);
  }

  dropOptions(event: CdkDragDrop<{ label: string, value: string }[]>) {
    moveItemInArray(this.rows, event.previousIndex, event.currentIndex);
  }
}
