import { Component, effect } from '@angular/core';
import { AgentsService } from '../../Services/agents/agents.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-agents-detailed',
  templateUrl: './agents-detailed.component.html',
  styleUrl: './agents-detailed.component.scss'
})
export class AgentsDetailedComponent {
  displayR=false;
  scrollPosition = 0;
  agent={status:0 , imgLink:'',Name:'', mainalt:'', maili:'', nomeri:'' , sacxovrebeli_adgili:'',chems_shesaxeb:'' , idi:''};
  effect=effect(() => {
    const agent = this.agentServ.ShowAgent();
    if (agent) {
      this.agent = agent;

  if(agent.angarishis_tipi=='gayidvebis_menejeri'){
  this.agent.mainalt='გაყიდვების მენეჯერი';
  }else{
    this.agent.mainalt='მომხმარებელი';
  }
    } else {
       
  this.closeAgent();
    }
  });
  constructor(private agentServ:AgentsService , private route:Router) { }

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.scrollPosition = window.scrollY;

    });
  }
    
  ActiveD(){
    this.displayR=!this.displayR;
  }
closeAgent(){
  this.route.navigate(['']);
}
ngOnDestroy() {
  this.effect.destroy(); // Clean up the effect when the component is destroyed

}
}
