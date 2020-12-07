import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../service/userService/user.service";
import { UtilityService  } from "../../service/utilityService/utility.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

 form: FormGroup;
 hide = true;
constructor(private fb: FormBuilder,private userService: UserService, private snakeBar:UtilityService,
  private _route:Router) { 
  this.form = this.fb.group({

    FirstName: ["", Validators.pattern('[a-zA-Z]{2,}')],

    LastName: ["", Validators.pattern('[a-zA-Z]{2,}')],

    Email: ["", Validators.email],

    Phone: [""],
    Address:[""],
    Password: ["", Validators.pattern('[A-Za-z0-9\\d!$%@#£€*?&]{8,}$')],
    Conform: [""],
    State:[""],
    City:[""],
    Pin:[""]
  })  
  }


  LoadData() {
    let userData = {
      "firstName": this.form.controls.FirstName.value,
      "lastName": this.form.controls.LastName.value,
      "email": this.form.controls.Email.value,
      "password": this.form.controls.Password.value,
      "address":this.form.controls.Address.value,
      "Pin":this.form.controls.Pin.value,
      "city":this.form.controls.City.value,
      "Phone": this.form.controls.Phone.value,
      "State":this.form.controls.State.value,
    }
    if(this.form.valid){
      console.log(userData)
      this.userService.register(userData).subscribe((result: any) => {
      this.snakeBar.snakeBarMethod("Thankyou for joining with us")
        console.log(result)
        this._route.navigate(['/login'])
      },
        (error) => {
        this.snakeBar.snakeBarMethod("OOPS..somethimg went wrong...")
          console.log(error)
        })
  
      }

  }



  

  ngOnInit(): void {
  }

}
