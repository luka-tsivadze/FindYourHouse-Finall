import { NgModule } from '@angular/core';

import { AgentRoutingModule } from './agent-routing.module';

import { SharedModule } from '../shared/shared.module';
import { AgentsDetailedComponent } from '../../main-page/agents-detailed/agents-detailed.component';
import { AgentsSModule } from '../shared/AgentsS.module';


@NgModule({
  declarations: [AgentsDetailedComponent],
  
  imports: [

    AgentRoutingModule,
    AgentsSModule,
     SharedModule,

    
  ]
})
export class AgentModule { }
