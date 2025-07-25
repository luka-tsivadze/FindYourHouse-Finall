import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegRoutingModule } from './reg-routing.module';
import { register } from 'module';
import { RegPageComponent } from '../../Components/reg-page/reg-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RegPageComponent],
  imports: [
    CommonModule,
    RegRoutingModule,
     ReactiveFormsModule,
          FormsModule,
  ]
})
export class RegModule { 

    constructor() {
 
  }
}
