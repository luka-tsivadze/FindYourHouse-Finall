import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeletePolicyComponent } from '../../Components/privace-policy/delete-policy/delete-policy.component';

const routes: Routes = [
  {path: '', component:DeletePolicyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DelPolicyRoutingModule { }
