import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditorPageComponent } from './user-editor-page.component';

describe('UserEditorPageComponent', () => {
  let component: UserEditorPageComponent;
  let fixture: ComponentFixture<UserEditorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEditorPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserEditorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
