import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PropertyInformationService } from '../../Services/Property-info/property-information.service';
import { MainPageDataService } from '../../Services/mainPageService/main-page-data.service';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';
import { NavInfoService } from '../../Services/NavService/nav-info.service';
import { AllCardsService } from '../../Services/all-cards/all-cards.service';
import { forkJoin, switchMap } from 'rxjs';
import { RegistrationService } from '../../Services/registration/registration.service';
import { CurrencyService } from '../../Services/currency/currency.service';

@Component({
  selector: 'app-similar-prop',
  templateUrl: './similar-prop.component.html',
  styleUrl: './similar-prop.component.scss'
})
export class SimilarPropComponent implements OnInit {
 simProp='Similar Properties'
data=this.Infoservice.similarProp;
FeaturePS=this.staticInfo.featuredPropertiesStatic;
 heartimg='../../../assets/Imges/Header/CardImges/icons/heart.svg';
  heartFilled='./../../../assets/Imges/StaticImg/StaticIcons/heart-fill - red.svg';
  heartimgLinks=[this.heartimg,this.heartimg,this.heartimg];
chosenCard=this.Infoservice.chosenCard;
  constructor(private Infoservice:PropertyInformationService, private staticInfo:MainPageDataService ,
    private lang:LanguageChooserService ,private navService:NavInfoService , 
    private cardsService:AllCardsService, private Registration:RegistrationService, private CurrencyServ:CurrencyService) {
    this.simProp=this.lang.chosenLang.DetailedInfo.simProp;
  }
  ngOnInit(): void {
  



this.Infoservice.chosenCard
  .pipe(
    switchMap((data) => {
      this.chosenCard = data;
      return forkJoin({
        similarProps: this.Infoservice.getSimilarProp(this.chosenCard),
        favData: this.cardsService.fetFavchData(this.navService.userId)
      });
    })
  )
  .subscribe(({ similarProps, favData }) => {


    this.data = similarProps.slice(0, 6).map((element) => {
      const uploadDate = new Date(element.statusis_gaaqtiurebis_tarigi);
      const currentDate = new Date();
      const dayDifference = Math.floor(
        (currentDate.getTime() - uploadDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      const images = JSON.parse(element.fotoebi);
      const imgLink = `houses/${element.amtvirtvelis_maili}/${element.gancxadebis_saidentifikacio_kodi}/photos/${images[0]}`;

      return {
        featuredBtn: true,
        For: element.garigebis_tipi,
        imgLink: imgLink,
        alt: element.satauri,
        header: element.satauri,
        location: element.qalaqi,
        bedrooms: element.sadzinebeli,
        bathrooms: element.sveli_wertilebis_raodenoba,
        area: element.fartobi,
        basePrice: Number((element.fasi).toString().replace(/[^\d]/g, '')) || 0,
        curConverted: false,
        garages: 1,
        price: Number((element.fasi).toString().replace(/[^\d]/g, '')) || 0,
        currency: element.fasis_valuta,
        profileName: element.momxmareblis_saxeli,
        uploadmonth: dayDifference ,
        id: element.idi,
      };
    });

    this.heartimgLinks = this.data.map(() => this.heartimg);
this.getMatchingIndexes(favData, this.data);
  
  });
  this.CurrencyServ.currency$.subscribe((currency) => {
      this.toggleAllCurrencies(currency, true);
    });

  }

  routertodetailedInfo(cardId: number): void {
    this.Infoservice.navigateToCard(cardId);
  }
  saveToFav(i:number , info){
    if(this.navService.userId===null){
      window.document.body.style.overflow = "hidden";
      this.Registration.setDisplayer(true);
      return;
     }
 
    const momxmareblis_idi= this.navService.userId
    const gancxadebis_idi=info.id
    const postBody={momxmareblis_idi,gancxadebis_idi}
    if(this.heartimgLinks[i]===this.heartimg){
        this.heartimgLinks[i]=this.heartFilled;
 
          
   this.cardsService.sendFavoriteCards(postBody)
      
  
      }
      else{// write remove function of api 
           this.cardsService.DeleteFavoriteCards(postBody);
        this.heartimgLinks[i]=this.heartimg;
      }

}


getMatchingIndexes(savedCards: any[], allCards: any[]): void {


  if (!this.heartimgLinks.length) {
    this.heartimgLinks = new Array(allCards.length).fill(this.heartimg);
  }

  // Optimize: Loop only through saved cards instead of all cards
  savedCards.forEach(savedCard => {
    const index = allCards.findIndex(card => card.id == savedCard.id);
    if (index !== -1) {
      this.heartimgLinks[index] = this.heartFilled;
      
    }
  });


}
toggleAllCurrencies(targetCurrency ,fromService?): void {

  this.data.forEach((card, id) => {


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
