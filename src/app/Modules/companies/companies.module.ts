import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from '../../companies/companies.component';
import { share } from 'rxjs';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CompaniesComponent],
  imports: [
    CommonModule,
    SharedModule,
    CompaniesRoutingModule
  ]
})
export class CompaniesModule { }
