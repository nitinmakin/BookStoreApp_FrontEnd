import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from "../../service/bookService/book.service";
import { UtilityService } from "../../service/utilityService/utility.service";
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from "../../service/dataService/data.service";
class ImageSnippet {
  constructor(public src: string, public file: File) { }
}


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  form: FormGroup;
  hide = true;
  fullName: string = "dcd"
  selectedFile: ImageSnippet;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;


  IsmodelShow = false;
  @Input() childMessage: string;
  @Input() id: any;
  @Input() element: any;

  constructor(private fb: FormBuilder, private book: BookService, public snakeBar: UtilityService,
    private route: Router, public dialogRef: MatDialogRef<DialogBoxComponent>,
    private data: DataService, @Inject(MAT_DIALOG_DATA) public data1: any,) {
    this.form = this.fb.group({
      Name: [""],
      Author: [""],
      Catetory: [""],
      Quantity: [""],
      Image: [""],
      Price: [""],
      Discription: [""],
      //  Image1:[""]
    })
  }
  ngOnInit(): void {
    if (this.childMessage == 'Add') {
      this.element = [];
    }
  }

  clickEvent() {
    if (this.childMessage == 'Add')
      this.addBooks();
    else
      this.updateNotes();
  }
  updateNotes() {
    let updateData = {
      "Name": (<HTMLInputElement>document.getElementById('name')).value,
      "Author": (<HTMLInputElement>document.getElementById('author')).value,
      // "Image": (<HTMLInputElement>document.getElementById('image')).value,
      "Quantity": (<HTMLInputElement>document.getElementById('quantity')).value,
      "Category": (<HTMLInputElement>document.getElementById('category')).value,
      "Price": parseInt((<HTMLInputElement>document.getElementById('price')).value),
      "Discription": (<HTMLInputElement>document.getElementById('discription')).value,
      "Image":this.url,
      "id": this.data1.id,
      "AdminId": this.data1.adminId
    }
    if (this.form.valid) {
      this.book.updateBooks(updateData).subscribe((result: any) => {
        this.data.changeMessage({});
        this.snakeBar.snakeBarMethod("Book Updated successfully");
        this.onNoClick();
      },
        (error) => {
          this.snakeBar.snakeBarMethod("OOPS..somethimg went wrong...")
        })
    }
  }
  addBooks() {

    let bookData = {
      "Name": this.form.controls.Name.value,
      "Author": this.form.controls.Author.value,
      "Image": this.url,
      "Quantity": this.form.controls.Quantity.value,
      "Category": this.form.controls.Catetory.value,
      "Price": parseInt(this.form.controls.Price.value),
      "Discription": this.form.controls.Discription.value
    }

    if (this.form.valid) {
      this.book.addBooks(bookData).subscribe((result: any) => {
        this.snakeBar.snakeBarMethod("Book added Successfully")
        this.data.changeMessage({});
        this.onNoClick();
      },
        (error) => {
          this.snakeBar.snakeBarMethod("OOPS..somethimg went wrong...")
        })
    }
  }
  bookImage = null;
  url: any[];
  selectFile(event: any) {


    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }



  onNoClick(): void {
    this.dialogRef.close();
  }
}
