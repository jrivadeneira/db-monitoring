import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsEditorPageComponent } from './reports-editor-page.component';

describe('ReportsEditorPageComponent', () => {
  let component: ReportsEditorPageComponent;
  let fixture: ComponentFixture<ReportsEditorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsEditorPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportsEditorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
