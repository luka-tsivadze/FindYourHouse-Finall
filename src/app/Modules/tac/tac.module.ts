import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TACRoutingModule } from './tac-routing.module';
import { TermsAndConditionsComponent } from '../../Components/terms-and-conditions/terms-and-conditions.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [TermsAndConditionsComponent],
  imports: [
  SharedModule,
    TACRoutingModule
  ]
})
export class TACModule { }
