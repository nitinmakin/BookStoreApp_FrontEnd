import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
//import {MatTableModule} from '@angular/material/table';
import { BookService } from "../../service/bookService/book.service";
import {MatDialog} from '@angular/material/dialog';
import { RegisterComponent } from "../register/register.component";


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-admin-panal',
  templateUrl: './admin-panal.component.html',
  styleUrls: ['./admin-panal.component.scss']
})
export class AdminPanalComponent implements OnInit {
  
  book=[];
  dataSource:any;
  displayedColumns: string[] = ['id','image', 'name', 'author', 'price','quantity','category','update','delete'];
 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(private books:BookService,public dialog: MatDialog) { }
  Admin = "Admin";
  displayNotes() {
    this.books.getBooks().subscribe(result => {
      this.book = result['data'];  
     this.book.reverse();
      console.log(this.book)
     this.dataSource = new MatTableDataSource(this.book);
      return this.book;
    },
      (error) => {
        console.log(error)
      })
  }


  openDialog() {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  ngOnInit(): void {
    this.displayNotes()
  }

}
