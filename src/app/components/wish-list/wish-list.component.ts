import { Component, OnInit } from '@angular/core';
import { BookService } from "../../service/bookService/book.service";
import { DataService } from "../../service/dataService/data.service";

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
wishListBookArray=[];
displayWishList=true;
length;
review:any;
  constructor(private bookService:BookService, private dataService:DataService) { }

  displayBooks() {
    this.bookService.getWishListBooks().subscribe(result => {
      this.wishListBookArray = result['data'];
      this.wishListBookArray.reverse();
      this.length=this.wishListBookArray.length;
      this.review=false
      console.log(this.wishListBookArray);
    },
      (error) => {
        console.log(error)
      })
  }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(data => { this.displayBooks() });
   
  }

}
