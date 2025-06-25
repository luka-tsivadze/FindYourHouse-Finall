import { ChangeDetectorRef, Component } from '@angular/core';
import { NavInfoService } from '../../Services/NavService/nav-info.service';
import { MainPageDataService } from '../../Services/mainPageService/main-page-data.service';
import { AllCardsService } from '../../Services/all-cards/all-cards.service';
import { PropertyInformationService } from '../../Services/Property-info/property-information.service';
import { Router } from '@angular/router';
import { FilterDataUniterService } from '../../Services/filter-data-uniter/filter-data-uniter.service';
import { concatMap } from 'rxjs';
import { RegistrationService } from '../../Services/registration/registration.service';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { CurrencyService } from '../../Services/currency/currency.service';

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.scss'],
  animations: [
  trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(50px)' }),
      animate('400ms 10ms ease-in', style({ opacity: 1, transform: 'translateY(0px)' })),
    ]),
  ]),
],
})
export class AllCardsComponent {
  cards: any[] = [];
  FeaturePS = this.mainPageService.featuredPropertiesStatic;

  ActivePage = 0;
  index = 0;
  pagesInfo = [];
  finalInfo = [];
  activePage = [];
  reviewIndices = [];
  pageIndices = [];
  pages: number;
  dataState = false;
  amountOfCards = 20;
  filteredCards: any[] = [];

  heartimgLinks=[];
  Languages;
    heartimg='../../../assets/Imges/Header/CardImges/icons/heart.svg'
  heartFilled='./../../assets/Imges/StaticImg/StaticIcons/heart-fill - red.svg'

  showCards = true;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private filterService: FilterDataUniterService,
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
  this.Languages =this.LangService.chosenLang;

      this.cardsService.fetFavchData(this.navService.userId).pipe(
        concatMap((filteredData) => {
          this.heartedCards = filteredData;
          return this.cardsService.fetchDataFromApi();
        })
      ).subscribe({
        next: (cards: any[]) => {
          this.cards = cards;
          this.filteredCards = cards; // Set filtered cards to all cards initially
          this.pageFunction(); // Call pageFunction after cards are ready
          this.heartimgLinks = new Array(this.filteredCards.length).fill(this.heartimg);
          this.getMatchingIndexes(this.heartedCards, this.cards);


        },
        error: (error) => {
          console.error('Error:', error);
        },
        complete: () => {
        
        },
      });

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
        this.heartimgLinks = new Array(allCards.length).fill(this.heartimg);
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

  this.cards.forEach((card, id) => {


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


shareComp=false;
shareInfo:any;

shareComponent(info){

this.shareInfo=info;

this.shareComp=true;
}

    callAnimation() {
      
  this.showCards = false;
  setTimeout(() => this.showCards = true, 1);
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
  

  ngAfterViewInit() {


    this.filterService.filtredCards$.subscribe((filteredIds) => {
      if ((!filteredIds || filteredIds.length == 0) && !this.filterService.wasCalled) {
        // If no filters are applied or the filterIds array is empty, reset to all cards

        return; // Skip further logic
      }
      // Filter the cards
      this.filteredCards = this.cards.filter((card) =>
        filteredIds.some((filterCard) => filterCard.idi === card.id)
      );
    
   
      this.resetPagination();
      this.changeDetectorRef.detectChanges();
    });
    
    
  }

  resetPagination() {
    this.index = 0;
    this.pagesInfo = [];
    this.finalInfo = [];
    this.pageIndices = [];
    this.activePage = [];
    this.pages = 0;
    this.ActivePage = 0;
    this.pageFunction();
    this.activePage = this.finalInfo[0] || [];
  }

  pageFunction() {
  

    this.pages = Math.ceil(this.filteredCards.length / this.amountOfCards);
    this.pageIndices = [];
    this.finalInfo = [];

    let index = 0;
    for (let i = 0; i < this.pages; i++) {
      this.pageIndices.push(i);
      this.pagesInfo = [];
      for (let j = 0; j < this.amountOfCards && index < this.filteredCards.length; j++) {
        this.pagesInfo.push(this.filteredCards[index]);
        index++;
      }
      this.finalInfo.push([...this.pagesInfo]);
    }

    this.activePage = this.finalInfo[0] || [];
    
    this.callAnimation();

  }

  chosenPage(index) {
    if (this.finalInfo[index]) {
      
      window.scrollTo({ top: 0, behavior: 'smooth' });

      this.activePage = this.finalInfo[index];
      this.ActivePage = index;
          this.callAnimation();

    }
  }
  
  routertodetailedInfo(cardId: number): void {
    this.detailedservice.navigateToCard(cardId);
  }
  trackByIndex(index: number): number {
    return index;
  }
  restoreState() {
    if (this.cards.length > 0) {
      this.filteredCards = this.cards;
      this.pageFunction();
    } else {
      this.cardsService.fetchDataFromApi().subscribe((cards: any[]) => {

        this.cards = cards;
        this.filteredCards = [...cards];
        this.pageFunction();
      });
    }
  }
}


