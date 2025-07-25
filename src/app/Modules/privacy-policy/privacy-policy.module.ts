import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';
import { PrivacePolicyComponent } from '../../Components/privace-policy/privace-policy.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PrivacePolicyComponent],
  imports: [
    CommonModule,
    PrivacyPolicyRoutingModule,
      SharedModule,
  ]
})
export class PrivacyPolicyModule { }
