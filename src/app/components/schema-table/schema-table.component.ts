import { Component, signal } from '@angular/core';
import { SchemaService } from '../../services/schema.service';
import { Schema } from '../../domain/schema';
import { NgForOf, NgIf } from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-schema-table',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './schema-table.component.html',
  styleUrl: './schema-table.component.scss'
})
export class SchemaTableComponent {
  schemas = signal<Schema[]>([]);
  constructor (
    private schemaService: SchemaService,
    private router: Router
  ) {
    this.refresh();
  }
  createNewSchema(){
    const schema = Schema.createEmptySchema();
    this.editButton(schema);
  }

  refresh() {
    this.schemaService.schemaObservable.subscribe((schemas: Schema[]) => {
      this.schemas.update(() => {
        return schemas;
      })
    });
  }

  editButton(schema: Schema) {
    this.schemaService.setCurrentSchema(schema);
    this.router.navigate(["schema-editor"]);
  }

  createFrom(schema: Schema) {
    this.editButton(Schema.fromData({...schema, id:0}));
  }
}
