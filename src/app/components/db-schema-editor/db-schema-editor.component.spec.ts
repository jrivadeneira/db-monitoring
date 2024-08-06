import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbSchemaEditorComponent } from './db-schema-editor.component';

describe('DbSchemaEditorComponent', () => {
  let component: DbSchemaEditorComponent;
  let fixture: ComponentFixture<DbSchemaEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbSchemaEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DbSchemaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
