import { Component, input, signal } from '@angular/core';
import {DbOption} from '../db-table/DbOption';
import {NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'db-options-menu',
  standalone: true,
  imports: [
    NgIf,
    NgFor
  ],
  templateUrl: './db-options-menu.component.html',
  styleUrl: './db-options-menu.component.scss'
})
export class DbOptionsMenuComponent {
  menuName = input<string>("");
  items = input<DbOption[]>();
  menuVisible = signal(false);
  constructor(){}

  showMenu() {
    this.menuVisible.update(() => true);
  }

  toggleMenu() {
    this.menuVisible.update(()=>!this.menuVisible());
  }
  // parameters need to be specified in the option (might also need the parent object)
  // reports table items need to specify the functions (and params?)
  // reports table items might need a builder for this.
  itemSelected(option: DbOption) {
    console.log("Option Selected: ", option.name);
    option.run(option.params);
  }
}
