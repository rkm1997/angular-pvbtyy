import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ApiService } from './services/cookies.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  name = 'Angular';
  columnDefs: any[] = [];
  rowData: any[] = [];
  users: any;
  cookiesData: Subscription;
  displayedColumns: string[] = ['name', 'name', 'weight', 'symbol'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort; 
  arr = []; 
  dir: string

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.columnDefs = [
      { field: 'category' },
      { field: 'name' },
      { field: 'price' },
    ];
    this.cookiesData = this.api.get().subscribe(res => {
      this.users = res;
      this.rowData = this.users.cookies;
      this.dataSource = new MatTableDataSource(this.rowData);
      console.log('data response', this.users);
    });
  }

  sortData() {
   this.rowData.forEach((obj) => {
     let eachObj = {
       "name": obj.name,
       "price": obj.price,
       "category": obj.category,
     }
     this.arr.push(eachObj);
   });
   this.dir = "dsc";
   //console.log(this.dir);
  //  if(this.dir = "asc"){
  //   this.dir = "dsc";
  //   this.rowData = this.rowData.sort((a, b) => ('' + a.category).localeCompare(b.category));  
  //  } else {
  //   this.rowData = this.rowData.sort((a, b) => ('' + a.name).localeCompare(b.name));
  //   this.dir = "asc"
  //  }
   let sort = this.rowData.map((item) => item.price = item.price.split("$")[1]);
   this.rowData = sort.sort((a, b) => a - b);
   console.log(sort);


   //console.log(this.arr.filter((item) => item.category === "Signature"));
  }
  
  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.cookiesData.unsubscribe();
  }
}
