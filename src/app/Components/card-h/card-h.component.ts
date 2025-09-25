import { ChangeDetectorRef, Component, Input, input, TrackByFunction } from '@angular/core';
import { concatMap } from 'rxjs';
import { AllCardsService } from '../../Services/all-cards/all-cards.service';
import { CurrencyService } from '../../Services/currency/currency.service';
import { FilterDataUniterService } from '../../Services/filter-data-uniter/filter-data-uniter.service';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';
import { MainPageDataService } from '../../Services/mainPageService/main-page-data.service';
import { NavInfoService } from '../../Services/NavService/nav-info.service';
import { PropertyInformationService } from '../../Services/Property-info/property-information.service';
import { RegistrationService } from '../../Services/registration/registration.service';

@Component({
  selector: 'app-card-h',
  templateUrl: './card-h.component.html',
  styleUrl: './card-h.component.scss'
})
export class CardHComponent {
@Input() activePage: Array<{
    gncxdebis_idi: number;
    featuredBtn: boolean;
    For: string;
    imgLink: string;
    alt: string;
    header: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    video: string;
    area: number;
    garages: number;
    currency: string;
    price: any; // Changed to number or string
    basePrice:number ;
    curConverted:boolean;
    companyname?:string;
    uploadmonth:number;
  }>; 


  FeaturePS = this.mainPageService.featuredPropertiesStatic;


  pagesInfo = [];
  finalInfo = [];

  reviewIndices = [];
  pageIndices = [];
  pages: number;
  dataState = true;
  amountOfCards = 20;
  filteredCards: any[] = [];

  heartimgLinks=[];
  Languages;
    heartimg='./../../../assets/Imges/Header/CardImges/icons/heart.svg'
  heartFilled='./../../../assets/Imges/StaticImg/StaticIcons/heart-fill - red.svg'

  showCards = true;

selectedVideo: string | null = null;

  constructor(
    private navService: NavInfoService,
   private Registration: RegistrationService,
    private detailedservice: PropertyInformationService,
    private LangService: LanguageChooserService,
    private mainPageService: MainPageDataService,
    private cardsService: AllCardsService,
  private CurrencyServ:CurrencyService ,

  ) {

    this.navService.scrollobser.next(true);

  }


  heartedCards;
    ngOnInit() {
    
        this.heartimgLinks = new Array(this.activePage.length).fill(this.heartimg);
      

  if (this.activePage?.length && this.activePage[0].companyname) {
    // Cards contain companyname -> run your company-specific logic
    this.dataState = true;
  } else {
    console.log('Normal card detected');
  }


  this.Languages =this.LangService.chosenLang;

  

      this.CurrencyServ.currency$.subscribe((currency) => {
        if (currency === '$' || currency === '₾') {
          this.toggleAllCurrencies(currency, true);
 

        }
      })
  
      this.cardsService.data$.subscribe((value) => {
        this.dataState = value;
      });

    }


    getMatchingIndexes(savedCards: any[], allCards: any[]): void {
      const savedCardIds = new Set(savedCards.map(saved => saved.id));
    
      // Optimize: Initialize `heartimgLinks` only once
      if (!this.heartimgLinks.length) {
        this.heartimgLinks = new Array(this.activePage.length).fill(this.heartimg);
      }
    
      // Optimize: Loop only through saved cards instead of all cards
      savedCards.forEach(savedCard => {
        const index = allCards.findIndex(card => card.id === savedCard.id);
        if (index !== -1) {
          this.heartimgLinks[index] = this.heartFilled;
        }
      });
    }


    toggleAllCurrencies(targetCurrency: '$' | '₾' ,fromService?): void {

    if(!fromService) {
      this.CurrencyServ.setCurrency(targetCurrency);
    }
  this.activePage.forEach((card, id) => {


        if (card.currency !== targetCurrency) {

          return;
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



  changeImage(direction: number, element: any): void {
  const currentIndex = element.imagesList.indexOf(element.imgLink);
  let newIndex = currentIndex + direction;

  // Wrap around logic
  if (newIndex < 0) {
    newIndex = element.imagesList.length - 1; // Go to last image
  } else if (newIndex >= element.imagesList.length) {
    newIndex = 0; // Go to first image
  }

  element.imgLink = element.imagesList[newIndex];
}


shareComp=false;
shareInfo:any;

shareComponent(info){
console.log(info); 
this.shareInfo=info;

this.shareComp=true;
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

    routertodetailedInfo(cardId: number): void {
    this.detailedservice.navigateToCard(cardId);
  }
  openVideoPopup(videoId): void {
      this.detailedservice.setCardId(videoId);
    this.selectedVideo = videoId;
  }
  trackById: TrackByFunction<any> = (index: number, item: any): number | string => {
    return item.id; // use a unique property from your data
  };
}
