import { Component, OnInit,Input } from '@angular/core';
import { BookService } from "../../service/bookService/book.service";
import { DataService } from "../../service/dataService/data.service";
import { UtilityService } from "../../service/utilityService/utility.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-books',
  templateUrl: './display-books.component.html',
  styleUrls: ['./display-books.component.scss']
})
export class DisplayBooksComponent implements OnInit {

  constructor(private bookService: BookService, private data:DataService, private snakeBar:UtilityService, private route:Router) { }
  @Input() bookArray: any;
  @Input() bookArrayLength;
@Input() displayBook:any;
@Input() displayCart:any;



reset = true;
orderSummary=true;
name=localStorage.getItem('FirstName')
address=localStorage.getItem('address')
city=localStorage.getItem('city')
state=localStorage.getItem('state')
pin=localStorage.getItem('pin')
phone=localStorage.getItem('phone')

addBookToCart(data){
   this.bookService.addBookToCart(data).subscribe((result: any) => {
    this.snakeBar.snakeBarMethod("Book added to Cart Successfully")
    this.data.changeMessage({});
   },
    (error) => {
      this.snakeBar.snakeBarMethod(error.error.message)
    })
}


reserFalse(){
  this.reset= false;
}

orderSummaryFalse(){
  this.orderSummary = false;
}
removeBookFromCart(data){
this.bookService.removeBookFromCart(data).subscribe((result: any)=>{
  console.log("data is "+ data)
  this.snakeBar.snakeBarMethod("Book removed from Cart")
  this.data.changeMessage({});
},
(error)=>{
  this.snakeBar.snakeBarMethod(error.error.message)
  console.log("data is "+ data)
})
}

  ngOnInit(): void {
  }

}
