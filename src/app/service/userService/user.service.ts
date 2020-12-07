import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpServiceService } from "../httpService/http-service.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpServiceService) { }



  baseUrl = environment.baseUrl;


  register(user) {
    console.log("user service called");
    return this.httpService.post(`${this.baseUrl}User/Registration`, user);
  }

  
  login(user) {
    console.log("user service called");
    return this.httpService.post(`${this.baseUrl}User/Login`, user);
  }

  forgetPassword(user) {
    console.log("user service called");
    return this.httpService.post(`${this.baseUrl}User/ForgetPassword`, user);
  }
  
  resetPassword(data, token) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }
    return this.httpService.post(`${this.baseUrl}User/ResetPassword/`, data, true, options)
  }
}
