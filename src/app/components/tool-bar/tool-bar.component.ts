import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from "../../service/utilityService/utility.service";

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  constructor(private route:Router, private snackBar:UtilityService) { }
  logout() {
       localStorage.removeItem('token');
       localStorage.removeItem('role');
       localStorage.removeItem('email');
       localStorage.removeItem('LastName');
       localStorage.removeItem('FirstName');
       this.route.navigate(['login'])
       this.snackBar.snakeBarMethod("logout successfully.")   
  }
  ngOnInit(): void {
  }

}
