import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { DragDropModule, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop'
import { FormsModule } from '@angular/forms';
import { SchemaService } from '../../services/schema.service';
import { Schema, SchemaField } from '../../domain/schema';
import { ReportEditorComponent } from '../report-editor/report-editor.component';
import { Report } from '../../domain/report';
import {DbTaglistComponent} from '../db-taglist/db-taglist.component';

@Component({
  selector: 'db-schema-editor',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    DragDropModule,
    ReportEditorComponent,
    CommonModule,
    DbTaglistComponent,
  ],
  templateUrl: './db-schema-editor.component.html',
  styleUrl: './db-schema-editor.component.scss'
})
export class DbSchemaEditorComponent {
  id = 0;
  schemaName = signal("")
  singleton = signal(false);
  fieldType = signal("");
  fieldName = signal("");
  fieldList = signal<SchemaField[]>([]);
  selectedRuleField = signal<SchemaField>(SchemaField.createEmpty());

  computedUpdateSignal = signal(1); // There is a reason for this
  reportPreview = computed<Report>(() => {
    // using this to update the computed signal avoids the issue of needing to reinitalize the array each time.
    const up = this.computedUpdateSignal();
    return Report.preview(this.fieldList());
  });
  rows: { label: string, value: string }[] = [{ label: '', value: '' }];
  constructor(private schemaService: SchemaService){
    schemaService.currentSchemaObservable.subscribe((each:Schema) => {
      console.log('loading schema');
      this.id = each.id;
      this.schemaName.update(() => {
        return each.name;
      });
      this.singleton.update(() => {
        return each.singleton;
      });
      this.fieldList.update(() => {
        return each.fields;
      });
    });
  }

  submitFieldName() {
    this.fieldList.update((values:SchemaField[]) => {
      values.push(new SchemaField(this.fieldName(), "text", false, 0, this.id));
      return values;
    });
    this.fieldName.set("");
    this.refreshFields();
  }

  deleteField(field: SchemaField){
    this.fieldList.update((list: SchemaField[]) => {
      list.splice(list.indexOf(field),1);
      return list;
    });
    this.refreshFields();
  }

  move(field:SchemaField, location: number){
    this.fieldList.update((list: SchemaField[]) => {
      list.splice(list.indexOf(field),1);
      if (location === -1) {
        list.push(field);
        return list;
      }

      if(location > list.length){
        return [field, ...list];
      }
      const ret = [
        ...list.slice(0,location),
        field,
        ...list.slice(location)
      ]
      return ret;
    })
  }

  refreshFields(){
    // this updates the number to a new value each time it is called.
    // This avoids the memory overhead of remaking the entire report array every time the user presses a key.
    this.computedUpdateSignal.update((value: number) => {
      return ~value;
    });
  }

  hideNameEditor(field: SchemaField) {
    field.editingName = false;
    this.refreshFields();
  }

  showNameEditor(field: SchemaField) {
    field.editingName = true;
  }

  drop(event: any) {
    const targetIndex = event.currentIndex;
    const value = event.item.data;
    this.move(value,targetIndex);
  }

  save() {
    const schema = new Schema(this.schemaName(), [...this.fieldList()], this.singleton());
    schema.id = this.id;
    this.schemaService.save(schema);
  }

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
