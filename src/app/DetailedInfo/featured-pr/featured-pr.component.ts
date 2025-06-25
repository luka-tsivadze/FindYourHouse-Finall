import { Component, OnInit } from '@angular/core';
import { PropertyInformationService } from '../../Services/Property-info/property-information.service';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';
import { MainPageDataService } from '../../Services/mainPageService/main-page-data.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from '../../Services/currency/currency.service';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-featured-pr',
  templateUrl: './featured-pr.component.html',
  styleUrl: './featured-pr.component.scss'
})
export class FeaturedPRComponent  implements OnInit {
 cardData = this.featuredProp.featuredProp;
 transformIndex = 0;
 staticvalues={
  header:'Featured Properties',
  area:'Area',
  rooms:'Rooms',
  beds:'Beds',
 }
 CurrentId
  
    constructor(private featuredProp:PropertyInformationService , private CurrencyServ:CurrencyService , private lang:LanguageChooserService, private mainService:MainPageDataService , private route:ActivatedRoute) {
      this.staticvalues=this.lang.chosenLang.DetailedInfo.Featuredpr;
      this.CurrentId = this.route.snapshot.paramMap.get('id');
     }

 ngOnInit(){ 
    this.mainService.getDiscoveredProperties().pipe(
      switchMap((data) => {
        if (!data) {
          this.cardData = this.featuredProp.featuredProp;
          return this.CurrencyServ.currency$;
        }

        this.cardData = data.map((item) => {
          return {
            img: item.imgLink,
            type: item.header,
            price: Number((item.price || '').toString().replace(/[^\d]/g, '')),
            basePrice: Number((item.basePrice || '').toString().replace(/[^\d]/g, '')),
            curConverted: false,
            currency: item.currency,
            For: item.For,
            locationCity: item.qalaqi,
            area: item.area,
            rooms: item.bathrooms,
            bedrooms: item.bedrooms,
            id: item.gncxdebis_idi,
          };
        }).filter(item => item.id !== this.CurrentId);

        return this.CurrencyServ.currency$;
      }),
      filter((currency) => currency === '$' || currency === '₾')
    ).subscribe((currency) => {
      this.toggleAllCurrencies(currency, true);
    });


}
    toggleAllCurrencies(targetCurrency ,fromService?): void {

  this.cardData.forEach((card, id) => {


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

  
leftTransform(){
  if(this.transformIndex > 0){
  this.transformIndex = this.transformIndex - 330;
}else{
  this.transformIndex = 0;

this.transformIndex=(this.cardData.length-1)*330;
}
 
}
RightTransform(){
  if(this.transformIndex < (this.cardData.length-1)*330){
  this.transformIndex = this.transformIndex + 330;
}else{
  this.transformIndex = 0;}

}
routertodetailedInfo(cardId: number): void {

  this.featuredProp.navigateToCard(cardId);
}
}