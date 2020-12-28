import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(public snakeBar:MatSnackBar) { }

  public snakeBarMethod(message){
    this.snakeBar.open(message, 'cancel')
   
    setTimeout(() => {
      this.snakeBar.dismiss();
    }, 2000)
  }

}
