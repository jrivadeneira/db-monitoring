import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Schema, SchemaDTO } from '../domain/schema';
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
    ajax.getJSON<SchemaDTO[]>("http://localhost:5000/schema").pipe(take(1)).subscribe((schemas: SchemaDTO[]) => {
      this.schemaSubject.next(schemas.map((each: SchemaDTO) => {
        return Schema.fromData(each);
      }));
      // schema might need some modification here to extract the special select object.
    });
  }

  save(schema: Schema) {
    // might need to modify schema now.
    const dto = schema.asDTO();
    return ajax.post<Schema>("http://localhost:5000/schema", dto).pipe(take(1)).subscribe(() => {
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
