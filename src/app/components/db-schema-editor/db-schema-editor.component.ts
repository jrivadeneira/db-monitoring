import {NgForOf, NgIf} from '@angular/common';
import { Component, model, signal } from '@angular/core';
import {
  DragDropModule
} from '@angular/cdk/drag-drop'
import { FormsModule } from '@angular/forms';
class SchemaField{
  constructor(
    public name: string,
    public type: string,
    public editingName: boolean = false
  ){}
}
@Component({
  selector: 'db-schema-editor',
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf, DragDropModule],
  templateUrl: './db-schema-editor.component.html',
  styleUrl: './db-schema-editor.component.scss'
})
export class DbSchemaEditorComponent {
  studyName = model("")
  siteName = model("");
  schemaName = model("")
  schemaType = model("");
  buildFrom = model("");
  fieldType = model("");
  fieldName = signal("");
  fieldList = signal<SchemaField[]>([]);
  submitFieldName() {
    this.fieldList.update((values:SchemaField[]) => {
      values.push(new SchemaField(this.fieldName(), "text"));
      return values;
    });
    this.fieldName.set("");
  }
  deleteField(field: SchemaField){
    this.fieldList.update((list: SchemaField[]) => {
      list.splice(list.indexOf(field),1);
      return list;
    })
  }

  move(field:SchemaField, location: number){
    this.fieldList.update((list: SchemaField[]) => {
      list.splice(list.indexOf(field),1);
      if(location === -1){
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

  hideNameEditor(field: SchemaField) {
    field.editingName = false;
  }

  showNameEditor(field: SchemaField) {
    field.editingName = true;
  }

  drop(event: any){
    const targetIndex = event.currentIndex;
    const value = event.item.data;
    this.move(value,targetIndex);
  }
}
