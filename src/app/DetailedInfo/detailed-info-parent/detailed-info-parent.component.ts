import { Component } from '@angular/core';
import { NavInfoService } from '../../Services/NavService/nav-info.service';
import { PropertyInformationService } from '../../Services/Property-info/property-information.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewsService } from '../../Services/views/views.service';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';

@Component({
  selector: 'app-detailed-info-parent',
  templateUrl: './detailed-info-parent.component.html',
  styleUrl: './detailed-info-parent.component.scss'
})
export class DetailedInfoParentComponent {
descH='Description';
displayR=false;
chosenCard;
  description;
showPropVideo=this.infoService.video;
floorplan=this.infoService.floorimg;
scrollPosition = 0;
mapvalidity: boolean = false;
ShowNearBy: boolean = false;

  constructor(private navService:NavInfoService ,private infoService:PropertyInformationService , 
     private route: ActivatedRoute, private views:ViewsService ,private lang:LanguageChooserService ,private navigation:Router) {

     

  }
  
  
  ngOnInit(): void {
    let cardId = JSON.parse(this.route.snapshot.paramMap.get('id')); 
    this.infoService.setCardId(cardId);
this.infoService.chosenCard.subscribe((card) => {
  this.chosenCard = card;
  this.description = card.describtion;
})
     
    this.descH=this.lang.chosenLang.DetailedInfo.parent;
   this.mapvalidity = 
    !isNaN(parseFloat(this.chosenCard.latitude.toString())) &&
    !isNaN(parseFloat(this.chosenCard.longitude.toString())) &&
    this.chosenCard.latitude !== null &&
    this.chosenCard.longitude !== null && this.chosenCard.latitude <= 90 && this.chosenCard.latitude >= -90 &&
    this.chosenCard.longitude <= 180 && this.chosenCard.longitude >= -180;
    
    const fieldsToCheck = [
      'saavadmyofos_dasaxeleba_1', 'saavadmyofos_dasaxeleba_2', 'saavadmyofos_dasaxeleba_3',
      'saavadmyofos_distancia_1', 'saavadmyofos_distancia_2', 'saavadmyofos_distancia_3',
      'skolis_dasaxeleba_1', 'skolis_dasaxeleba_2', 'skolis_dasaxeleba_3',
      'skolis_distancia_1', 'skolis_distancia_2', 'skolis_distancia_3',
      'transportis_dasaxeleba_1', 'transportis_dasaxeleba_2', 'transportis_dasaxeleba_3',
      'transportis_distancia_1', 'transportis_distancia_2', 'transportis_distancia_3'
    ];
    
    this.ShowNearBy = fieldsToCheck.some(field => {
      const value = this.chosenCard[field];  // Get field value
      return value !== null && value !== undefined && value !== ''; // Check if it's valid
    });

 
    
    
    if(this.infoService.chosenCard){
    this.navService.scrollobser.next(true);
   }
 // send view to the server

    window.addEventListener('scroll', () => {
      this.scrollPosition = window.scrollY;

    });

    this.views.sendView(this.chosenCard.id); 
  }
  
  ActiveD(){
  this.displayR=!this.displayR;
}
  
}
