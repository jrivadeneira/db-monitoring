import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicEditorComponent } from './logic-editor.component';

describe('LogicEditorComponent', () => {
  let component: LogicEditorComponent;
  let fixture: ComponentFixture<LogicEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogicEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogicEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
