import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.scss']
})
export class SuccessOrderComponent implements OnInit {

  constructor(private route: Router) { }
  navigateBook() {
    this.route.navigate(['dashboard/books'])
  }
  ngOnInit(): void {
  }

}
