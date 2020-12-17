import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from "../../service/utilityService/utility.service";
import { CartComponent } from '../cart/cart.component';
import { DataService } from "../../service/dataService/data.service";
import { Book } from "../../Model/book";
import { BookService } from "../../service/bookService/book.service";

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
  constructor(private route: Router, private snackBar: UtilityService, private dataService: DataService,
    private bookService:BookService) { }
  books: Book[];
  filteredBooks: Book[];
  bookName: string;
 @Input() searchTerm:any;



 bookSearch() {
  console.log(this.bookName);
  this.bookService.setSearchBookData(this.bookName);
}

  ngOnInit(): void {
    if (this.childMessage == "Admin") {
      this.dispalyimg = false;
      this.dispalySearchBar = false;
      this.displayTitle = true;
      this.message = "Admin Panal"
    }
    else {
      this.dispalyimg = true;
      this.dispalySearchBar = true;
      this.message = "User DashBoard"
    }

    this.dataService.currentMessage.subscribe(message => {
      console.log("receved message  " + message);
      this.length = message;
    })
  }

  @Input() childMessage: string;
  dispalyimg = null
  dispalySearchBar = null
  displayTitle = null
  message = null
  length: any;
  @ViewChild(CartComponent) child;

  name1 = localStorage.getItem('FirstName');
  name2 = localStorage.getItem('LastName');
  a = " ";
  name = `${this.name1}${this.a}${this.name1}`;
  email = localStorage.getItem('email');

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('LastName');
    localStorage.removeItem('FirstName');
    this.route.navigate(['login'])
    this.snackBar.snakeBarMethod("logout successfully.")
  }

  navigateCart() {
    this.route.navigate(['dashboard/cart'])
  }
}
