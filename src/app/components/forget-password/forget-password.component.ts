import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from "../../service/userService/user.service";
import { UtilityService  } from "../../service/utilityService/utility.service";



@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  hide = true;
  form: FormGroup;
  constructor(private fb: FormBuilder, private activateRoute:ActivatedRoute, private user:UserService,
    private snakeBar:UtilityService) {

    this.form = this.fb.group({
      Email: ["", Validators.email],
    })
   }


   LoadData() {
    let userData = {
      "email": this.form.controls.Email.value,
    }

    if (this.form.valid) {
      console.log(userData)
      this.user.forgetPassword(userData).subscribe((result: any) => {
        localStorage.setItem('token', result.data)
        this.snakeBar.snakeBarMethod("link of reset password has send to your email successfully.")
       
        console.log(result)
      },
        (error) => {
          console.log(error)
          this.snakeBar.snakeBarMethod("enter valid email")
        })
            
        this.activateRoute.paramMap.subscribe(params => {
          var token = params.get('token');            
          console.log("token is "+token);
        });  
    }
    console.log(this.form.value)
  }



  ngOnInit(): void {
  }

}
