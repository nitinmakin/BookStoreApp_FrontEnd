import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { UserServiceService } from "../../Services/user-service.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

 form: FormGroup;
 hide = true;
constructor(private fb: FormBuilder) { 
  this.form = this.fb.group({

    FirstName: ["", Validators.pattern('[a-zA-Z]{2,}')],

    LastName: ["", Validators.pattern('[a-zA-Z]{2,}')],

    Email: ["", Validators.email],

    Password: ["", Validators.pattern('[A-Za-z0-9\\d!$%@#£€*?&]{8,}$')],

    Conform: [""]

  })
  
  }

  

  ngOnInit(): void {
  }

}
