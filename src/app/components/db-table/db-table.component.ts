import { Component, OnInit, Input, signal, computed, input } from '@angular/core';
import { NgForOf, NgStyle, AsyncPipe } from "@angular/common";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { DbOption } from './DbOption';
import { DbOptionsMenuComponent } from '../db-options-menu/db-options-menu.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'db-table',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle,
    AsyncPipe,
    DbOptionsMenuComponent,
    FormsModule
  ],
  templateUrl: './db-table.component.html',
  styleUrl: './db-table.component.scss'
})
export class DbTableComponent implements OnInit {
  headers = signal<string[]>([]);
  @Input() data!: Observable<any[]>;
  @Input() displayHeaders: string[] = [];
  private sortIndex = signal(-1);
  private reverseSort = signal(false);
  public searchTerms = signal("");

  public dataObservable = computed<Observable<any>>(()=>{
    const sortIndex = this.sortIndex();
    const searchTerm = this.searchTerms();
    const reverseSort = this.reverseSort();
    const filteredData =  this.dataSubject.asObservable().pipe(map((each:any) => {
      const filtered = each.filter((eachLine:any) => {
        const fil = this.asStringFromHeaders(eachLine).includes(searchTerm);
        return fil;
      });
    const target = this.headers()[sortIndex];
    return filtered.sort((a:any, b:any)=>{
      if(a[target] === b[target]){
        return 0;
      }
      if(a[target] > b[target]) {
        return reverseSort ? -1 : 1;
      }
      return reverseSort ? 1 : -1;
    });
    }));
    return filteredData;
  });

  public dataListObservable = computed<Observable<any[]>>(()=>{
    return this.dataObservable().pipe(map((rows: any[])=>{
      let dataList = [];
      for(let eachItem of rows) {
        for(let eachHeader of this.headers()) {
          const each = eachItem[eachHeader];
          dataList.push(each);
        }
      }
      console.log(dataList);
      return dataList;
    }))
  });


  public columnStyle = computed(()=>{
    let colStyle = '';
    let lengthOfHeaders = this.headers().length;
    for(let i = 0; i < this.headers().length; i++) {
      colStyle += (this.tableColumnsWidth);
      colStyle += "% ";
    }
    console.log("updating columnsStyle", colStyle)
    return colStyle;
  });
  private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject([] as any[]);

  constructor() {}

  ngOnInit(): void {
    this.data.subscribe((data: any[]) => {
      this.extractHeaders(data);
      // this.setupColumnStyle();
      this.dataSubject.next(data);
    });
  }

  private asStringFromHeaders(obj: any){
    let ret = "";
    for(let eachHeader of this.headers()){
      ret += obj[eachHeader];
    }
    return ret;
  }

  // private setupColumnStyle() {
    // for(let i = 0; i < this.headers.length; i++) {
      // this.columnStyle += (this.tableColumnsWidth);
      // this.columnStyle += "% ";
    // }
  // }

  private extractHeaders(data:any[]) {
    if(this.headers.length < 1) {
      if(data.length > 0) {
        const target = data[0];
        console.log("updating headers")

        this.headers.update(()=>Object.keys(target));
        console.log(this.headers());
      }
    }
  }

  // This function is going to get the number of columns in the table by 100%/number of headers
  get tableColumnsWidth(): number {
    return (100 / this.headers().length);
  }

  public sortBy(colIndex: number) {
    if(this.sortIndex()!==colIndex){
      this.sortIndex.update(()=>colIndex);
      this.reverseSort.update(() => true);
    } else {
      this.reverseSort.update(()=>!this.reverseSort());
    }
  }

  getType(item: any) {
    return typeof(item);
  }

  isArray(item: any) {
    return Array.isArray(item);
  }

  isOptionArray(item: any) {
    return item[0] instanceof DbOption;
  }

  optionName(option: any) {
    return option.name;
  }

  optionsArray(options: any):DbOption[]{
    return options as DbOption[];
  }

  executeOption(option: any){
    return option.run();
  }
}
