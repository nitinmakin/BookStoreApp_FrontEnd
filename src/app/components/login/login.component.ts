import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../service/userService/user.service";
import { UtilityService  } from "../../service/utilityService/utility.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup;
  constructor(private fb: FormBuilder,private userService: UserService, private snakeBar:UtilityService,
    private _route:Router) {

    this.form = this.fb.group({
      Email: ["", Validators.email],
      Password: ["", Validators.pattern('[A-Za-z0-9\\d!$%@#£€*?&]{8,}$')],
    })
   }


   LoadData() {
    let userData = {
      "email": this.form.controls.Email.value,
      "password": this.form.controls.Password.value,
    }

    if (this.form.valid) {
      console.log(userData)
      this.userService.login(userData).subscribe((result: any) => {
        this.snakeBar.snakeBarMethod("login successfull.")
     
        localStorage.setItem('token',result.data.token);
        localStorage.setItem('role',result.data.role);
        localStorage.setItem('email',result.data.email);
        localStorage.setItem('FirstName',result.data.firstName);
        localStorage.setItem('LastName',result.data.lastName);
   
        console.log(result)

        if(localStorage.getItem('role') == 'Admin')
        this._route.navigate(['admin'])
        else
      this._route.navigate(['dashboard/books'])
      },
        (error) => {
          console.log(error)
          this.snakeBar.snakeBarMethod("Incorrect Email or Password")
        
        })
    }
    console.log(this.form.value)
  }


  ngOnInit(): void {
  }

}
