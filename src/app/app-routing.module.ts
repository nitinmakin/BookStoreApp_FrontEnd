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
    path:'dashboard',component:DashBoardComponent, canActivate: [AuthGuard]
  },
  {
    path:'admin',component:AdminPanalComponent, canActivate: [AuthGuard]
  },
  {
    path:'dialogBox',component:DialogBoxComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
