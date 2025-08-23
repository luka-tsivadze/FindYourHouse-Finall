import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllCardsRoutingModule } from './all-cards-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MainCardsComponent } from '../../CardPage/main-cards/main-cards.component';


@NgModule({
  declarations: [MainCardsComponent],
  imports: [
    CommonModule,
    AllCardsRoutingModule,
    SharedModule,
    
  ]
})
export class AllCardsModule {

constructor() {
  console.log('AllCardsModule loaded');

 }
}
