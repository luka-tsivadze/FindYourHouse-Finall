import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DelPolicyRoutingModule } from './del-policy-routing.module';
import { DeletePolicyComponent } from '../../Components/privace-policy/delete-policy/delete-policy.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [DeletePolicyComponent],
  imports: [
    CommonModule,
    DelPolicyRoutingModule,
      SharedModule,
  ]
})
export class DelPolicyModule { }
