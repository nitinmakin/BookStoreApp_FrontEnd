import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from "../../service/bookService/book.service";
import { UtilityService } from "../../service/utilityService/utility.service";
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from "../../service/dataService/data.service";



@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  form: FormGroup;
  hide = true;
  IsmodelShow = false;
  constructor(private fb: FormBuilder, private book: BookService, public snakeBar: UtilityService,
    private route: Router, public dialogRef: MatDialogRef<DialogBoxComponent>,
 private data:DataService ) {
    this.form = this.fb.group({

      Name: [""],
      Author: [""],
      Catetory: [""],
      Quantity: [""],
      Image: [""],
      Price: [""],
    })
  }

  addBooks() {
    let bookData = {
      "Name": this.form.controls.Name.value,
      "Author": this.form.controls.Author.value,
      "Image": this.form.controls.Image.value,
      "Quantity": this.form.controls.Quantity.value,
      "Catetory": this.form.controls.Catetory.value,
      "Price": this.form.controls.Price.value,
    }

    if (this.form.valid) {
      this.book.addBooks(bookData).subscribe((result: any) => {
        this.snakeBar.snakeBarMethod("Book added Successfully")
        this.onNoClick();
        this.data.changeMessage({});
      },
        (error) => {
          this.snakeBar.snakeBarMethod("OOPS..somethimg went wrong...")
        })
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit(): void {
  }

}
