import { Component, Input, input, SimpleChanges } from '@angular/core';
import { forkJoin, switchMap } from 'rxjs';
import { AllCardsService } from '../../Services/all-cards/all-cards.service';

import { RegistrationService } from '../../Services/registration/registration.service';
import { MainPageDataService } from '../../Services/mainPageService/main-page-data.service';
import { PropertyInformationService } from '../../Services/Property-info/property-information.service';
import { NavInfoService } from '../../Services/NavService/nav-info.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent {

  @Input() agent!: {
    status: number;
    imgLink: string;
    Name: string;
    mainalt: string;
    maili: string;
    nomeri: string;
    sacxovrebeli_adgili: string;
    chems_shesaxeb: string;
    idi:string | number;
  };


  data=this.Infoservice.similarProp;
  FeaturePS=this.staticInfo.featuredPropertiesStatic;
   heartimg='../../../assets/Imges/Header/CardImges/icons/heart.svg';
    heartFilled='./../../../assets/Imges/StaticImg/StaticIcons/heart-fill - red.svg';
    heartimgLinks=[this.heartimg,this.heartimg,this.heartimg];
  allCards;
    constructor(private Infoservice:PropertyInformationService, private staticInfo:MainPageDataService ,
private navService:NavInfoService , 
      private cardsService:AllCardsService, private Registration:RegistrationService, ) {

    }
    ngOnInit(): void { 
      if (this.agent && this.agent.status !== 0) {

      }

    }
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['agent'] && this.agent && this.agent.status !== 0) {
        this.cardsService.fetchDataFromApi().subscribe((data) => {
          
          this.allCards = data.filter((card) => {
            return card.UserId === this.agent.idi;
          });
          if(this.allCards.length!==0 && this.allCards){
            console.log('this is filtered cards:',this.allCards);
            this.loadCardData(this.allCards);
        
          }else{
            this.data=[];
          }

        });

      }
    }
    loadCardData(cards: any[]): void {

    
      // TODO: Replace [] with real API call once it's ready
      forkJoin({
     // e.g. this.cardsService.fetchSimilar(cardId),
        favData: this.cardsService.fetFavchData(this.navService.userId)
      }).subscribe(({ favData }) => {

        this.data = cards.map((element) => {
          return {
            featuredBtn: true,
            For: element.For,
            imgLink: element.imgLink,
            alt: element.alt,
            header: element.header,
            location: element.location,
            bedrooms: element.bedrooms,
            bathrooms: element.bathrooms,
            area: element.area,
            garages: 1,
            price: element.price,
            profileName: element.profileName,
            uploadmonth: element.uploadmonth,
            id: element.id,
          };
        });
    
        this.heartimgLinks = this.data.map(() => this.heartimg);
        this.getMatchingIndexes(favData, this.data);
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
        else{
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
}
