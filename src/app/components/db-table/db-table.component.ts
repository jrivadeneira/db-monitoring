import { Component, OnInit, Input } from '@angular/core';
import { NgForOf, NgStyle, AsyncPipe } from "@angular/common";
import { Observable, ReplaySubject } from 'rxjs';
import { take } from "rxjs/operators";
import {DbOption} from './DbOption';
@Component({
  selector: 'db-table',
  standalone: true,
  imports: [NgForOf, NgStyle, AsyncPipe],
  templateUrl: './db-table.component.html',
  styleUrl: './db-table.component.scss'
})
export class DbTableComponent implements OnInit {

  @Input() headers: string[] = [];
  @Input() data!: Observable<any[]>;

  @Input() displayHeaders: string[] = [];
  public columnStyle: string = '';
  public dataList: string[] = [];
  private dataSubject: ReplaySubject<any[]> = new ReplaySubject(1);
  private dataListSubject: ReplaySubject<string[]> = new ReplaySubject(1);
  private sortIndex = -1;

  constructor() {
  }

  ngOnInit(): void {
    this.data.subscribe((data: any[]) => {
      this.dataSubject.next(data);
      this.extractHeaders(data);
      this.setupColumnStyle();
      this.extractTableData();
    });
  }

  private setupColumnStyle() {
    for(let i = 0; i < this.headers.length; i++) {
      this.columnStyle += (this.tableColumnsWidth);
      this.columnStyle += "% ";
    }
  }

  private extractHeaders(data:any[]) {
    if(this.headers.length < 1) {
      if(data.length > 0) {
        const target = data[0];
        this.headers = Object.keys(target);
      }
    }
  }

  // extracts all the table data according to the headers for each object and stores it in the data list;
  private extractTableData(){
    this.dataList=[];
    this.dataObservable.pipe().subscribe((newData:any[]) => {
      for(let eachItem of newData) {
        for(let eachHeader of this.headers) {
          this.dataList = [...this.dataList,eachItem[eachHeader]];
        }
      }
    });
    this.dataListSubject.next(this.dataList);
  }

  get dataListObservable(){
    return this.dataListSubject.asObservable();
  }
  // This function is going to get the number of columns in the table by 100%/number of headers
  get tableColumnsWidth(): number {
    return (100 / this.headers.length);
  }

  public get dataObservable(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }

  public sortBy(colIndex: number) {
    if(colIndex === this.sortIndex) {
      this.dataObservable.pipe(take(1)).subscribe((currentData: any[]) => {
        this.dataSubject.next(currentData.reverse());
        this.extractTableData();
      });
      return;
    }
    this.sortIndex = colIndex;
    const target = this.headers[colIndex];
    this.dataObservable.pipe(take(1)).subscribe((currentData: any[]) => {
      this.dataSubject.next(currentData.sort((a,b)=> {
        if(a[target] === b[target]) {
          return 0;
        }
        if(a[target] > b[target]) {
          return 1;
        }
        return -1;
      }));
    });
    this.extractTableData();
  }
  getType(item: any) {
    return typeof(item);
  }

  isArray(item: any){
    return Array.isArray(item);
  }

  isOptionArray(item: any){
    return item[0] instanceof DbOption;
  }
}
