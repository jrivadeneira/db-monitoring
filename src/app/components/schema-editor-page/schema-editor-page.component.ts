import { Component } from '@angular/core';
import { DbSchemaEditorComponent } from '../db-schema-editor/db-schema-editor.component';

@Component({
  selector: 'app-schema-editor-page',
  standalone: true,
  imports: [
    DbSchemaEditorComponent
  ],
  templateUrl: './schema-editor-page.component.html',
  styleUrl: './schema-editor-page.component.scss'
})
export class SchemaEditorPageComponent {

}
