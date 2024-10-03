import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Schema } from '../domain/schema';
import { ajax } from 'rxjs/ajax';
@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  private currentSchemaSubject: BehaviorSubject<Schema> = new BehaviorSubject<Schema>(Schema.createEmptySchema());
  private schemaSubject: BehaviorSubject<Schema[]> = new BehaviorSubject<Schema[]>([]);
  constructor() {
    this.getLatest();
  }

  get schemaObservable(): Observable<Schema[]>{
    return this.schemaSubject.asObservable();
  }

  getLatest(){
    ajax.getJSON<Schema[]>("http://localhost:5000/schema").pipe(take(1)).subscribe((schemas: Schema[]) => {
      this.schemaSubject.next(schemas);
    });;
  }

  save(schema: Schema) {
    return ajax.post<Schema>("http://localhost:5000/schema", schema).pipe(take(1)).subscribe(() => {
      this.getLatest();
    });
  }

  get currentSchemaObservable(): Observable<Schema> {
    return this.currentSchemaSubject.asObservable();
  }

  setCurrentSchema(schema: Schema){
    this.currentSchemaSubject.asObservable().pipe(take(1)).subscribe((currentSchema: Schema) => {
      if(!currentSchema.equals(schema)){
        this.currentSchemaSubject.next(schema);
      }
    });
  }
}
