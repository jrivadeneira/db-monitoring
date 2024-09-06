import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsTablePageComponent } from './reports-table-page.component';

describe('ReportsTablePageComponent', () => {
  let component: ReportsTablePageComponent;
  let fixture: ComponentFixture<ReportsTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsTablePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportsTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
