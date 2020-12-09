import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.scss']
})
export class AddBooksComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddBooksComponent>) { }

  ngOnInit(): void {
  }
  add="Add";
}
