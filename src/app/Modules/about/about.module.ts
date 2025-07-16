import { NgModule } from '@angular/core';



import { AboutUsComponent } from '../../about-us/about-us.component';



import { SharedModule } from '../shared/shared.module';
import { AboutRoutingModule } from './about-routing.module';


@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    SharedModule,
      AboutRoutingModule
  ]
})
export class AboutModule { 

  constructor() {
    console.log('AboutModule loaded');
  }
}
