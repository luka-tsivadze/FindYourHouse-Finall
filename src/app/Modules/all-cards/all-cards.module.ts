import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllCardsRoutingModule } from './all-cards-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AllCardsRoutingModule,
    SharedModule,
    
  ]
})
export class AllCardsModule { }
