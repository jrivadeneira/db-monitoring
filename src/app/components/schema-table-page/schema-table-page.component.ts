import { Component } from '@angular/core';
import {SchemaTableComponent} from '../schema-table/schema-table.component';
import {Schema} from '../../domain/schema';
import {SchemaService} from '../../services/schema.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-schema-table-page',
  standalone: true,
  imports: [
    SchemaTableComponent
  ],
  templateUrl: './schema-table-page.component.html',
  styleUrl: './schema-table-page.component.scss'
})
export class SchemaTablePageComponent {
  constructor(
    private schemaService: SchemaService,
    private router: Router
  ){

  }

  createNewSchema(){
    const schema = Schema.createEmptySchema();
    this.editButton(schema);
  }

  editButton(schema: Schema) {
    this.schemaService.setCurrentSchema(Schema.fromData(schema));
    this.router.navigate(["schema-editor"]);
  }
}
