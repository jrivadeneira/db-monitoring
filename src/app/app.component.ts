import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {DbSchemaEditorComponent} from './components/db-schema-editor/db-schema-editor.component';
import {SchemaTableComponent} from './components/schema-table/schema-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DbSchemaEditorComponent,
    SchemaTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'db-monitoring';
}
