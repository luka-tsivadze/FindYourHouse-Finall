import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentsDetailedComponent } from '../../main-page/agents-detailed/agents-detailed.component';

const routes: Routes = [
  {path:'', component:AgentsDetailedComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
