import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFieldEditorModalComponent } from './report-field-editor-modal.component';

describe('ReportFieldEditorModalComponent', () => {
  let component: ReportFieldEditorModalComponent;
  let fixture: ComponentFixture<ReportFieldEditorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportFieldEditorModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportFieldEditorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
