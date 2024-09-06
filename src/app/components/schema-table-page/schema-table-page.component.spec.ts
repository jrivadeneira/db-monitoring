import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaTablePageComponent } from './schema-table-page.component';

describe('SchemaTablePageComponent', () => {
  let component: SchemaTablePageComponent;
  let fixture: ComponentFixture<SchemaTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchemaTablePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchemaTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
