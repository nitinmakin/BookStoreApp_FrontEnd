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



addBookToCart(data){
   this.bookService.addBookToCart(data).subscribe((result: any) => {
    this.snakeBar.snakeBarMethod("Book added Successfully")
    this.data.changeMessage({});
   },
    (error) => {
      this.snakeBar.snakeBarMethod(error.error.message)
    })
}
  ngOnInit(): void {
  }

}
