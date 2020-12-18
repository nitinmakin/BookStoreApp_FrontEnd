
import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';

import { BookService } from "../../service/bookService/book.service";

import { DataService } from "../../service/dataService/data.service";

import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  constructor(private books: BookService, private dataService: DataService) { }
  bookArray = [];
  cartBookArray=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  length;
  displayBook: any;
  dataSource:any;
 
  displayBooks() {
    this.books.getBooks().subscribe(result => {
      this.displayBook = true;
      this.bookArray = result['data'];
      this.bookArray.reverse();
     this.dataSource= this.paginator;
      this.length = this.bookArray.length;
      console.log(this.bookArray)
    //  this.displayCartBooks();
    },
      (error) => {
        console.log(error)
      })
  }


  // displayCartBooks() {
  //   this.books.getCartBooks().subscribe(result => {
  //     this.cartBookArray = result['data'];
  //     this.cartBookArray.reverse();
  //     this.length = this.cartBookArray.length;
  //     console.log(this.cartBookArray);
  //     this.dataService.changeMessage(this.length);
  //     return this.cartBookArray;
  //   },
  //     (error) => {
  //       console.log(error)
  //     })
  // }


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

  ngOnInit(): void {
   // this.dataService.currentMessage.subscribe(data => { this.displayBooks()});
   //this.dataService.currentMessage.subscribe(data => this.displayCartBooks())
 // this.dataService.changeMessage(this.displayCartBooks());
 this.displayBooks();
  }
}
