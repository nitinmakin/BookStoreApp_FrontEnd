import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { ForgetPasswordComponent } from "./components/forget-password/forget-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { DashBoardComponent } from "./components/dash-board/dash-board.component";
import { AuthGuard } from './auth.guard';
import { AdminPanalComponent } from './components/admin-panal/admin-panal.component';
import { DialogBoxComponent } from "./components/dialog-box/dialog-box.component";
import { BooksComponent } from "./components/books/books.component";
import { CartComponent } from "./components/cart/cart.component";
import { WishListComponent } from "./components/wish-list/wish-list.component";
import { DisplayBooksComponent } from "./components/display-books/display-books.component";
import { SuccessOrderComponent } from "./components/success-order/success-order.component";
import { ReviewPageComponent } from "./components/review-page/review-page.component";

const routes: Routes = [
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'forget',component:ForgetPasswordComponent
  },
  {
   path: 'reset/:token',component: ResetPasswordComponent
  },
  {
    path:'admin',component:AdminPanalComponent, canActivate: [AuthGuard]
  },
  {
    path:'dialogBox',component:DialogBoxComponent
  },
  {
   path:'displaybooks', component:DisplayBooksComponent
  },

  {
    path: "dashboard", component: DashBoardComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'books',
        component: BooksComponent
      },
      {
        path: 'wishlist',
        component: WishListComponent
      },
      {
        path: 'success',
        component: SuccessOrderComponent
      },
      {
        path: 'reviews/:id',
        component: ReviewPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
