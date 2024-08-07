import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Schema } from '../domain/schema';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  private schemaSubject: BehaviorSubject<Schema[]> = new BehaviorSubject([] as Schema[]);

  constructor() { }

  get schemaObservable(): Observable<Schema[]>{
    return this.schemaSubject.asObservable();
  }

  save(schema: Schema) {
    console.log('here!')
    this.schemaSubject.asObservable().pipe(take(1)).subscribe((schemas: Schema[]) => {
      const nxt = [...schemas, schema];
      console.log(nxt);
      this.schemaSubject.next(nxt);
    });
  }
}
