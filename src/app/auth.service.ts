import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  isAuthenticate = false;
  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    }
    else {
      return false
    }
  }
}
