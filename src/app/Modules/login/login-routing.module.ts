import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../Components/login/login.component';
import { ForgotPasswordComponent } from '../../Components/forgot-password/forgot-password.component';


const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'PasswordRecovery', component: ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
