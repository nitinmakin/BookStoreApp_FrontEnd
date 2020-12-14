import { Component, OnInit ,Input, ViewChild, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from "../../service/utilityService/utility.service";
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  constructor(private route:Router, private snackBar:UtilityService) { }

  @Input() childMessage: string;
  dispalyimg=null
  dispalySearchBar=null
  displayTitle=null
  message=null
  length:any;
  @ViewChild(CartComponent) child;

name1 = localStorage.getItem('FirstName');
name2 = localStorage.getItem('LastName');
a = " ";
name=`${this.name1}${this.a}${this.name1}`;
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

  navigateCart(){
    this.route.navigate(['dashboard/cart'])
   
    }
    
  ngOnInit(): void {
    if (this.childMessage == "Admin"){
      this.dispalyimg=false;
     this.dispalySearchBar=false;
     this.displayTitle=true;
     this.message="Admin Panal"
  
    }
    else{
      this.dispalyimg=true;
      this.dispalySearchBar=true;
      this.message="User DashBoard"
   
    }
  }


  // ngAfterViewInit() {
  //   this.length = this.child.length1;
  //   console.log("length is "+this.length);
  // }


}
