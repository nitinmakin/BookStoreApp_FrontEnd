import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { BookService } from "../../service/bookService/book.service";
import { DataService } from "../../service/dataService/data.service";



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartBookArray = [];
  length;
  constructor(private books: BookService, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(data => { this.displayBooks()});
  }

  displayBooks() {
    this.books.getCartBooks().subscribe(result => {
      this.cartBookArray = result['data'];
      this.cartBookArray.reverse();
      this.length = this.cartBookArray.length ;
      //  console.log(this.bookArray)
      // this.dataSource = new MatTableDataSource(this.book);
      // this.dataSource.paginator = this.paginator;
    },
      (error) => {
        console.log(error)
      })
  }

}
