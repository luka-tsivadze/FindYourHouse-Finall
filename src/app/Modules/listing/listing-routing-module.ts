import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingParentComponent } from '../../ListingPageComponents/listing-parent/listing-parent.component';

const routes: Routes = [
  {path:'' , component:ListingParentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingRoutingModule { 

    constructor() {
    console.log('Module loaded');
  }
}
