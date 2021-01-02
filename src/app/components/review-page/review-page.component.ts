import { Component, OnInit } from '@angular/core';
import { BookService } from "../../service/bookService/book.service";
import { ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from "../../service/utilityService/utility.service";
import { DataService } from "../../service/dataService/data.service";

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss']
})

export class ReviewPageComponent implements OnInit {
  displayBook: any;
  reviews = true;
  bookArray: [];
  reviewArray: [];
  form: FormGroup;
  public constructor(private books: BookService, private route: ActivatedRoute,
    private data:DataService,private fb: FormBuilder,private snakeBar:UtilityService) {
    this.form = this.fb.group({
   review:[""]
    })
   }

  id: any;
  name: any;
  author: any;
  image: any;
  obj: any;
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })
    this.displayBooksById(this.id);
    this.getBookReview(this.id)
  }
  displayBooksById(id) {
    this.books.getBooksById(id).subscribe(async result => {
      this.bookArray = result['data']
      this.reviews = true;
    },
      (error) => {
        console.log(error)
      })
  }
  getBookReview(id) {
    this.books.getBookReview(id).subscribe(async result => {
      this.reviewArray = result['data']
      console.log("result is ", result)
      console.log("reviewArray is ", this.reviewArray)
    },
      (error) => {
        console.log(error)
      })
  }
addBookReview(){
  let reviewData={
   "Review":this.form.controls.review.value
  }
  console.log(reviewData)
  this.books.addBookReview(this.id,reviewData).subscribe((result: any) => {
    this.snakeBar.snakeBarMethod("Review added Successfully")
   this.getBookReview(this.id)
  },
    (error) => {
      this.snakeBar.snakeBarMethod("OOPS..somethimg went wrong...")
    })
}

}
