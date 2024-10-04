import { Component } from '@angular/core';
import {LogicEditorComponent} from '../logic-editor/logic-editor.component';

@Component({
  selector: 'app-users-table-page',
  standalone: true,
  imports: [LogicEditorComponent],
  templateUrl: './users-table-page.component.html',
  styleUrl: './users-table-page.component.scss'
})
export class UsersTablePageComponent {

}
