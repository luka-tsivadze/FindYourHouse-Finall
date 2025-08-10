import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainCardsComponent } from '../../CardPage/main-cards/main-cards.component';

const routes: Routes = [
  {path:'' , component:MainCardsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllCardsRoutingModule { }
