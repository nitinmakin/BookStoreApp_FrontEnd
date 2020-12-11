
import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from "../../service/bookService/book.service";
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from "../dialog-box/dialog-box.component";
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from "../../service/dataService/data.service";
import { UtilityService } from "../../service/utilityService/utility.service";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateBooksComponent } from "../update-books/update-books.component";
import { AddBooksComponent } from "../add-books/add-books.component";


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  constructor(private books:BookService, private dataService:DataService) { }
bookArray=[];
length;
  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(data => { this.displayBooks()});
  }
  displayBooks() {
    this.books.getBooks().subscribe(result => {
      this.bookArray = result['data'];
      this.bookArray.reverse();
      this.length=this.bookArray.length+1;
      console.log(this.bookArray)
      // this.dataSource = new MatTableDataSource(this.book);
      // this.dataSource.paginator = this.paginator;
    },
      (error) => {
        console.log(error)
      })
  }

}
