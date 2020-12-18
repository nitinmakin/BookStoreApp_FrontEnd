import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BookService } from "../../service/bookService/book.service";
import { DataService } from "../../service/dataService/data.service";
import { UtilityService } from "../../service/utilityService/utility.service";
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
//import { DataService } from "../../service/dataService/data.service";
@Component({
  selector: 'app-display-books',
  templateUrl: './display-books.component.html',
  styleUrls: ['./display-books.component.scss']
})
export class DisplayBooksComponent implements OnInit {

  constructor(private bookService: BookService, private data: DataService, private snakeBar: UtilityService,
    private route: Router, private dialog: MatDialog) { }

  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';
  page = 1;
  count = 0;
  pageSize = 3;
  currentPage = 2;
  pageSizes = 10;
  showDiscription: any = [];
  bookSearch: any;
  length: any;

  handlePageChange(event): void {
    this.page = event;
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

  //@Input() searchText:any
  @Input() bookArray: any;
  @Input() bookArrayLength;
  @Input() displayBook: any;
  @Input() displayCart: any;
  @Input() displayWishList: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  reset = true;
  orderSummary = true;
  cartCondition: any = [];
  cartBookArray: any = [];

  addBookToCart(data) {
    this.bookService.addBookToCart(data.id).subscribe((result: any) => {
      this.snakeBar.snakeBarMethod("Book added to Cart Successfully");
      data.cartConditionButton=true;
      this.data.changeCartLength({ data1: data });
    },
      (error) => {
        this.snakeBar.snakeBarMethod(error.error.message)
      })
  }

  getSearchBookData() {
    this.bookService.getSearchBookData().subscribe((message) => {
      console.log("search data- ", message.books);
      this.bookSearch = message.books;
    })
  }

  addBookToWishList(data) {
    this.bookService.addBookToWishList(data).subscribe((result: any) => {
      this.snakeBar.snakeBarMethod("Book added to Wishlist Successfully");
    },
      (error) => {
        this.snakeBar.snakeBarMethod(error.error.message)
      })
  }

  removeBookFromWishList(data) {
    this.bookService.removeBookFromWishList(data).subscribe((result: any) => {
      this.snakeBar.snakeBarMethod("book removed from Wishlist");
      this.data.changeMessage({});
    },
      (error) => {
        this.snakeBar.snakeBarMethod(error.error.message);
      })
  }
  addToCartFromWishlist(data) {
    this.bookService.addBookFromWishlistToCart(data.bookId).subscribe((result: any) => {
      this.snakeBar.snakeBarMethod("Book Added to cart");
      data.cartConditionButton=true;
      this.data.changeMessage({});
      this.data.changeCartLength({});
    },
      (error) => {
        this.snakeBar.snakeBarMethod(error.error.message);
      }
    )
  }
 

  orderSummaryFalse() {
    this.orderSummary = false;
  }
  // resolveAfter2Seconds(x) {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve(x);
  //     }, 200);
  //   });
  // }

  ngOnInit() {
    this.data.currentMessage.subscribe(data => { this.getSearchBookData() });
  }
}


