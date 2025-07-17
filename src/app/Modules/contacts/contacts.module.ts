import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';

import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from '../../contact/contact.component';


@NgModule({
  declarations: [ContactComponent],
  imports: [
    SharedModule,
    ContactsRoutingModule
  ]
})
export class ContactsModule { 


}
