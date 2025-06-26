import { Component } from '@angular/core';
import { PropertyInformationService } from '../../Services/Property-info/property-information.service';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from '../../Services/currency/currency.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.scss'
})
export class RecentComponent {

Recentdata:any = this.cardService.RecentProp;
recentStatic='Recent Properties';
CurrentId ;
  constructor(private cardService:PropertyInformationService ,private lang:LanguageChooserService , private route:ActivatedRoute , private CurrencyServ:CurrencyService) {
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
            price:  card.fasi,
            currency:card.fasis_valuta,
            img: `houses/${card.amtvirtvelis_maili}/${card.gancxadebis_saidentifikacio_kodi}/photos/${FirstImage}`,
            curConverted:false,
            basePrice:card.fasi,
            route:card.idi,
          };
        }).filter(item => item.id !== this.CurrentId);
      
     
      }
   
    });

          this.CurrencyServ.currency$.subscribe((currency) => {
        this.toggleAllCurrencies(currency, true);
      });
  }
  routertodetailedInfo(cardId: number): void {
    this.cardService.navigateToCard(cardId);
  }

      toggleAllCurrencies(targetCurrency ,fromService?): void {

  this.Recentdata.forEach((card, id) => {


        if (card.currency !== targetCurrency) {
          return;
        }
    if(!fromService) {
      this.CurrencyServ.setCurrency(targetCurrency);
    }

    if (!card.curConverted) {
      card.currency = targetCurrency === '₾' ? '$' : '₾';
      card.price = this.CurrencyServ.changeCurrency(targetCurrency, card.basePrice);
      card.curConverted = true;


    } else {
      card.price = card.basePrice;
      card.currency = targetCurrency === '₾' ? '$' : '₾';
      card.curConverted = false;

    }
  });
  console.log(this.Recentdata)

}

}
