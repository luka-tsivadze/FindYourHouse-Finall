import { NgModule } from '@angular/core';


import { ContactRoutingModule } from './contact-routing.module';

import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from '../../contact/contact.component';


@NgModule({
  declarations: [ContactComponent],
  imports: [
  SharedModule,
    ContactRoutingModule
  ]
})
export class ContactModule { 

    constructor() {
    console.log('AboutModule loaded');
  }
}
