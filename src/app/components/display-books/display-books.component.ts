import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BookService } from "../../service/bookService/book.service";
import { DataService } from "../../service/dataService/data.service";
import { UtilityService } from "../../service/utilityService/utility.service";
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

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
  pageSizes = 5;
  showDiscription: any = [];


  handlePageChange(event): void {
    this.page = event;
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }


  @Input() bookArray: any;
  @Input() bookArrayLength;
  @Input() displayBook: any;
  @Input() displayCart: any;
  @Input() displayWishList: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  reset = true;
  orderSummary = true;
  cartCondition: any = [];


  addBookToCart(data) {
    this.bookService.addBookToCart(data).subscribe((result: any) => {
     // this.cartConditionMethod(index);
      this.snakeBar.snakeBarMethod("Book added to Cart Successfully");
        this.data.changeMessage({});
    },
      (error) => {
        this.snakeBar.snakeBarMethod(error.error.message)
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
    this.bookService.addBookFromWishlistToCart(data).subscribe((result: any) => {
      this.snakeBar.snakeBarMethod("Book Added to cart");
      this.data.changeMessage({});
    },
      (error) => {
        this.snakeBar.snakeBarMethod(error.error.message);
      }
    )
  }
  cartConditionMethod(index) {
    this.cartCondition[index] = true;
  }

  orderSummaryFalse() {
    this.orderSummary = false;
  }

  ngOnInit(): void {
  }
}
