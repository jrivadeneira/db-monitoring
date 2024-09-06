import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTablePageComponent } from './users-table-page.component';

describe('UsersTablePageComponent', () => {
  let component: UsersTablePageComponent;
  let fixture: ComponentFixture<UsersTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTablePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
