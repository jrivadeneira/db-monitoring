import { Component, signal } from '@angular/core';
import { SchemaService } from '../../services/schema.service';
import { Schema } from '../../domain/schema';
import { NgForOf, NgIf } from '@angular/common';
import {Router} from '@angular/router';
import {DbTableComponent} from '../db-table/db-table.component';
import {map, Observable} from 'rxjs';
import {DbOption} from '../db-table/DbOption';

@Component({
  selector: 'app-schema-table',
  standalone: true,
  imports: [NgForOf, NgIf, DbTableComponent],
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

  get schemaObservable(): Observable<any[]> {
    return this.schemaService.schemaObservable.pipe(map((schemas: Schema[]) => {
      {
        return schemas.map((each:Schema) => {
          return {
            "Schema Name": each.name,
            "Field Count": each.fields.length,
            "": [
              new DbOption("Edit",()=>{this.editButton(each)}),
              new DbOption("Create From",()=>{this.createFrom(each)}),
            ]
          }
        })


      }
    }));
  }

  refresh() {
    this.schemaService.schemaObservable.subscribe((schemas: Schema[]) => {
      this.schemas.update(() => {
        return schemas;
      })
    });
  }

  editButton(schema: Schema) {
    this.schemaService.setCurrentSchema(Schema.fromData(schema));
    this.router.navigate(["schema-editor"]);
  }

  createFrom(schema: Schema) {
    this.editButton(Schema.fromData({...schema, id:0}));
  }
}
