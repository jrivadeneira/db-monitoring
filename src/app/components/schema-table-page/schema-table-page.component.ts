import { Component } from '@angular/core';
import {SchemaTableComponent} from '../schema-table/schema-table.component';

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

}
