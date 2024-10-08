import { NgFor, NgIf } from '@angular/common';
import { Component, input, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'db-taglist',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './db-taglist.component.html',
  styleUrl: './db-taglist.component.scss',
})
export class DbTaglistComponent {
  name = input<string>();
  text = signal("");
  items = model<string[]>([]);

  enterHit(){
    this.items.update((current: string[]) => {
      current.push(this.text());
      return current;
    });
    this.text.set("");
  }

  removeTag (tagIndex: number) {
    this.items.update((tags:string[]) => {
      tags.splice(tagIndex,1);
      return tags;
    });
  }
}
