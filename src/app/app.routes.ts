import { Routes } from '@angular/router';
import { SchemaEditorPageComponent } from './components/schema-editor-page/schema-editor-page.component';
import { ReportsTablePageComponent } from './components/reports-table-page/reports-table-page.component';
import { SchemaTablePageComponent } from './components/schema-table-page/schema-table-page.component';
import { UsersTablePageComponent } from './components/users-table-page/users-table-page.component';
import {ReportsEditorPageComponent} from './components/reports-editor-page/reports-editor-page.component';

export const routes: Routes = [
  {
     path: '', component: ReportsTablePageComponent
  },
  {
     path: 'schemas', component: SchemaTablePageComponent
  },
  {
     path: 'schema-editor', component: SchemaEditorPageComponent
  },
  {
     path: 'users', component: UsersTablePageComponent
  },
  {
     path: 'report-editor', component: ReportsEditorPageComponent
  },
];
