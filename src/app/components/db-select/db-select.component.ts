import {NgFor, NgIf} from '@angular/common';
import { Component, model, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'db-select',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './db-select.component.html',
  styleUrl: './db-select.component.scss'
})
export class DbSelectComponent {
  selected = signal<any>(undefined);
  options = model<any[]>();

  constructor(){}

  optionSelected(option: any){
    this.selected.update(() => option);
  }
}
