
import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';

import { BookService } from "../../service/bookService/book.service";

import { DataService } from "../../service/dataService/data.service";



@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  constructor(private books: BookService, private dataService: DataService) { }
  bookArray = [];

  length;
  displayBook: any;
  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(data => { this.displayBooks()});
  }
  displayBooks() {
    this.books.getBooks().subscribe(result => {
      this.displayBook = true;
      this.bookArray = result['data'];
      this.bookArray.reverse();
      this.length = this.bookArray.length;
      console.log(this.bookArray)
      // this.dataSource = new MatTableDataSource(this.book);
      // this.dataSource.paginator = this.paginator;
    },
      (error) => {
        console.log(error)
      })
  }


  highToLow() {
    this.books.priceHighToLow().subscribe((result: any) => {
      this.bookArray =  result['data'];
    })
  }

  lowToHigh() {
    this.books.priceLowToHigh().subscribe((result: any) => {
      this.bookArray = result['data'];     
    })
  }
}
