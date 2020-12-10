import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-display-books',
  templateUrl: './display-books.component.html',
  styleUrls: ['./display-books.component.scss']
})
export class DisplayBooksComponent implements OnInit {

  constructor() { }
  @Input() bookArray: any;

  ngOnInit(): void {
  }

}
