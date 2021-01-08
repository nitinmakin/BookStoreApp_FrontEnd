import { Component, OnInit } from '@angular/core';
import { BookService } from "../../service/bookService/book.service";
import { ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from "../../service/utilityService/utility.service";
import { DataService } from "../../service/dataService/data.service";
function times(max: number) {
  return {
    [Symbol.iterator]: function* () {
      for (let i = 0; i < max; i++, yield) {
      }
    }
  };
}
@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss']
})

export class ReviewPageComponent implements OnInit {
  displayBook: any;
  id: any;
  name: any;
  author: any;
  image: any;
  obj: any;
  rating: number = 0;
  showCommentInput: boolean = true;

  showCommentInputMethod() {
    this.showCommentInput = false;
  }
  starArray: any = [
    {
      star: true
    },
    {
      star: true
    },
    {
      star: true
    },
    {
      star: true
    },
    {
      star: true
    }
  ];

  ratingMethod(i) {
    this.rating = i + 1;
    this.showCommentInputMethod();
    for (var j = 0; j <= i; j++) {
      this.starArray[j].star = false;
    }
  }
  ratingMethodDec(i) {
    this.rating = i + 1;
    this.showCommentInputMethod();
    for (var j = i + 1; j <= 5; j++) {
      this.starArray[j].star = true;
    }
  }

  reviews = true;
  bookArray: [];
  reviewArray: [];
  times = times;
  form: FormGroup;
  public constructor(private books: BookService, private route: ActivatedRoute,
    private data: DataService, private fb: FormBuilder, private snakeBar: UtilityService) {
    this.form = this.fb.group({
      review: [""]
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })
    this.displayBooksById(this.id);
    this.getBookReview(this.id)
    this.data.currentMessage.subscribe(data => { this.rating = 0 });

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
    },
      (error) => {
        console.log(error)
      })
  }
  addBookReview() {
    let reviewData = {
      "Review": this.form.controls.review.value,
      "Rating": this.rating
    }
    this.books.addBookReview(this.id, reviewData).subscribe((result: any) => {
      this.snakeBar.snakeBarMethod("Review added Successfully")
      this.getBookReview(this.id)
      this.showCommentInput = true;
      for (var j = 0; j <= 5; j++) {
        this.starArray[j].star = true;
      }
    },
      (error) => {
        this.snakeBar.snakeBarMethod("OOPS..somethimg went wrong...")
      })
  }

}
