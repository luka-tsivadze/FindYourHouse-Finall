import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacePolicyComponent } from '../../Components/privace-policy/privace-policy.component';

const routes: Routes = [
  {path: '', component:PrivacePolicyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacyPolicyRoutingModule { }
