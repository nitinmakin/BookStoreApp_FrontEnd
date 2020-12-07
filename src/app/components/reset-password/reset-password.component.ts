import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../service/userService/user.service";
import { UtilityService  } from "../../service/utilityService/utility.service";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  hide = true;
  form: FormGroup;
  constructor(private fb: FormBuilder,private userService: UserService, private snakeBar:UtilityService,
    private _route:ActivatedRoute, private _route1:Router) {

    this.form = this.fb.group({
      Password: ["", Validators.pattern('[A-Za-z0-9\\d!$%@#£€*?&]{8,}$')],
    })
  }



  LoadData() {
    let token = this._route.snapshot.params.token;
    console.log(token);  
    let userData = {
      "newPassword": this.form.controls.Password.value,
    }
    if (this.form.valid) {
      console.log(userData)
      this.userService.resetPassword(userData, token).subscribe((result: any) => {
        this.snakeBar.snakeBarMethod("Password changed Successfully")
        console.log(result)
        this._route1.navigate(['login'])
      },
        (error) => {
          this.snakeBar.snakeBarMethod("OOPS..somethimg went wrong...")
          console.log(error)
        })
    }
    console.log(this.form.value)
  }



  ngOnInit(): void {
  }

}
