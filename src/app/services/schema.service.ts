import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Schema } from '../domain/schema';
import { ajax } from 'rxjs/ajax';
@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  private schemaSubject: BehaviorSubject<Schema[]> = new BehaviorSubject([] as Schema[]);

  constructor() {}

  get schemaObservable(): Observable<Schema[]>{
    return ajax.getJSON("http://localhost:5000/schema");
  }

  save(schema: Schema) {
    console.log('here!');
    console.log(schema);
    return ajax.post("http://localhost:5000/schema", schema).subscribe();
//    this.schemaSubject.asObservable().pipe(take(1)).subscribe((schemas: Schema[]) => {
//      const nxt = [...schemas, schema];
//      console.log(nxt);
//      this.schemaSubject.next(nxt);
//    });
  }
}
