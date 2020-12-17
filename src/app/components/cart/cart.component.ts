import { Component, OnInit, AfterViewInit, ViewChild, Output, Inject, EventEmitter } from '@angular/core';
import { BookService } from "../../service/bookService/book.service";
import { DataService } from "../../service/dataService/data.service";
import { UtilityService } from "../../service/utilityService/utility.service";
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartBookArray = [];
  length1 = 4;
  length;
  reset=true;
  orderSummary=true;
  name = localStorage.getItem('FirstName')
  address = localStorage.getItem('address')
  city = localStorage.getItem('city')
  state = localStorage.getItem('state')
  pin = localStorage.getItem('pin')
  phone = localStorage.getItem('phone')


  constructor(private bookService: BookService, private dataService: DataService, private snakeBar:UtilityService,
    private route: Router) { }

 displayCartBooks() {
    this.bookService.getCartBooks().subscribe(result => {
      this.cartBookArray = result['data'];
      this.cartBookArray.reverse();
      this.length = this.cartBookArray.length;
      console.log("length is "+this.length);
      console.log(this.cartBookArray);
      
 //this.dataService.changeMessage(this.length);
    },
      (error) => {
        console.log(error)
      })
  }

  resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 200);
    });
  }

  placeOrder() {
    this.bookService.placedOrder().subscribe((result: any) => {
      this.snakeBar.snakeBarMethod("Order Placed Successfully");
      this.route.navigate(['dashboard/books'])
      this.dataService.changeMessage({});
    },
      (error) => {
        this.snakeBar.snakeBarMethod(error.error.message);
      }
    )
  }
  reserFalse() {
    this.reset = false;
  }
  
  orderSummaryFalse() {
    this.orderSummary = false;
  }

  removeBookFromCart(data) {
    this.bookService.removeBookFromCart(data).subscribe((result: any) => {
      this.snakeBar.snakeBarMethod("Book removed from Cart")
      this.dataService.changeMessage({});
    },
      (error) => {
        this.snakeBar.snakeBarMethod(error.error.message)
        console.log("data is " + data)
      })
  }

  increaseQuantity(data) {
    this.bookService.increaseQuantity(data).subscribe((result: any) => {
      this.dataService.changeMessage({});
    });
  }

  decreaseQuantity(data) {
    this.bookService.decreaseQuantity(data).subscribe((result: any) => {
      this.dataService.changeMessage({});
    });
  }


  

  async ngOnInit(){
  this.dataService.currentMessage.subscribe(data => {this.displayCartBooks()});
  await this.resolveAfter2Seconds(1);
  this.dataService.changeMessage(this.length);

//  this.dataService.currentMessage.subscribe(message => {
//   console.log("receved message  " + message);
//   this.cartBookArray = message; 
// })
  }
}
