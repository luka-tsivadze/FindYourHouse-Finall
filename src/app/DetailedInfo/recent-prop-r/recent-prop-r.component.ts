import { Component, OnInit } from '@angular/core';
import { PropertyInformationService } from '../../Services/Property-info/property-information.service';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';
import { first, switchMap } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from '../../Services/currency/currency.service';

@Component({
  selector: 'app-recent-prop-r',
  templateUrl: './recent-prop-r.component.html',
  styleUrl: './recent-prop-r.component.scss'
})
export class RecentPropRComponent implements OnInit {

Recentdata:any = this.cardService.RecentProp;
recentStatic='Recent Properties';
CurrentId ;
  constructor(private cardService:PropertyInformationService ,private lang:LanguageChooserService , private route:ActivatedRoute , private CurrencyServ:CurrencyService) {
    this.recentStatic=this.lang.chosenLang.DetailedInfo.recentStatic; 
  this.CurrentId = this.route.snapshot.paramMap.get('id');
   }
  ngOnInit(): void {
  this.cardService.getRecentProp().pipe(
    switchMap((data: any[]) => {
      if (data) {
        this.Recentdata = data.map((card: any) => {
          const images = JSON.parse(card.fotoebi);
          const FirstImage = images[0];

          return {
            type: card.satauri,
            price: Number((card.fasi || '').toString().replace(/[^\d]/g, '')) || 'Price Unavailable',
            currency: card.fasis_valuta,
            basePrice: Number((card.fasi || '').toString().replace(/[^\d]/g, '')) || 'Price Unavailable',
            curConverted: false,
            img: `houses/${card.amtvirtvelis_maili}/${card.gancxadebis_saidentifikacio_kodi}/photos/${FirstImage}`,
            route: card.idi,
            id: card.idi // Ensure 'id' exists for filtering
          };
        }).filter((item: any) => item.id !== this.CurrentId);

        return this.CurrencyServ.currency$;
      }
      // Return an empty observable if data is falsy to satisfy all code paths
      return this.CurrencyServ.currency$;
    }),
    filter((currency) => currency === '$' || currency === '₾')
  ).subscribe((currency) => {
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

}

    }


