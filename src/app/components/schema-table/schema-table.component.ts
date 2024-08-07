import { Component, signal } from '@angular/core';
import { SchemaService } from '../../services/schema.service';
import { Schema } from '../../domain/schema';
import { take } from 'rxjs';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-schema-table',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './schema-table.component.html',
  styleUrl: './schema-table.component.scss'
})
export class SchemaTableComponent {
  schemas = signal<Schema[]>([]);
  constructor(private schemaService: SchemaService){
    this.refresh();
  }
  refresh(){
    this.schemaService.schemaObservable.pipe(take(1)).subscribe((schemas:Schema[]) => {
      this.schemas.update(() => {
        return schemas;
      })
    });
  }
}
