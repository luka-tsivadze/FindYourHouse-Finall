import { Component } from '@angular/core';
import { PropertyInformationService } from '../../Services/Property-info/property-information.service';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.scss'
})
export class RecentComponent {

Recentdata:any = this.cardService.RecentProp;
recentStatic='Recent Properties';
CurrentId ;
  constructor(private cardService:PropertyInformationService ,private lang:LanguageChooserService , private route:ActivatedRoute) {
    this.recentStatic=this.lang.chosenLang.DetailedInfo.recentStatic; 
  this.CurrentId = this.route.snapshot.paramMap.get('id');
   }
  ngOnInit(): void {
    this.cardService.getRecentProp().subscribe((data) => {  
      if (data) {
        this.Recentdata = data.map((card) => {
          const images = JSON.parse(card.fotoebi);
          const FirstImage = images[0];

          return {
            type: card.satauri,
            price: card.fasis_valuta + ' ' + card.fasi,
            img: `houses/${card.amtvirtvelis_maili}/${card.gancxadebis_saidentifikacio_kodi}/photos/${FirstImage}`,
            route:card.idi,
          };
        }).filter(item => item.id !== this.CurrentId);
      }
   
    });
  }
  routertodetailedInfo(cardId: number): void {
    this.cardService.navigateToCard(cardId);
  }
}
