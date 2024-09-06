import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaEditorPageComponent } from './schema-editor-page.component';

describe('SchemaEditorPageComponent', () => {
  let component: SchemaEditorPageComponent;
  let fixture: ComponentFixture<SchemaEditorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchemaEditorPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchemaEditorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
