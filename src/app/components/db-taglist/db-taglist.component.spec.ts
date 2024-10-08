import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbTaglistComponent } from './db-taglist.component';

describe('DbTaglistComponent', () => {
  let component: DbTaglistComponent;
  let fixture: ComponentFixture<DbTaglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DbTaglistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DbTaglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
