import { Component } from '@angular/core';
import { AllCardsService } from '../../Services/all-cards/all-cards.service';
import { PropertyInformationService } from '../../Services/Property-info/property-information.service';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';
import { ViewsService } from '../../Services/views/views.service';
import { concatMap, switchMap, tap } from 'rxjs';
import { NavInfoService } from '../../Services/NavService/nav-info.service';
import { RegistrationService } from '../../Services/registration/registration.service';

@Component({
  selector: 'app-card-gallery1',
  templateUrl: './card-gallery1.component.html',
  styleUrl: './card-gallery1.component.scss'
})
export class CardGallery1Component {
staticH2='Gallery';
 data;
 ForActive=0;
 chosenCard;
 priceForM;
 mainImg;
 viewsCount;
 heartimg='../../../assets/Imges/Header/CardImges/icons/heart.svg'
 heartFilled='./../../assets/Imges/StaticImg/StaticIcons/heart-fill - red.svg'
 heartimgLinks=this.heartimg;

 unit;
  constructor( private cardInfo:PropertyInformationService ,private lang:LanguageChooserService , private views:ViewsService ,private navService:NavInfoService ,  
      private Registration: RegistrationService, private cardsService:AllCardsService
) {
this.staticH2=this.lang.chosenLang.DetailedInfo.CardGallery1;
this.unit=this.lang.chosenLang.DetailedInfo.unit;

   }
   ngOnInit(): void {
    this.cardInfo.chosenCard
      .pipe(
        tap((card) => {
   
          this.chosenCard = card;
          this.data = card;
          
          this.priceForM = card.area;
              // this.priceForM=Math.round(Number(this.data.purePrice)/Number(this.data.area)) + this.data.currency || 'GEL';
          this.mainImg = card.img[this.ForActive];
        }),
        switchMap((card) => this.views.getCardViews(card.id))
      )
      .subscribe((viewsData) => {
        this.viewsCount = viewsData.count;
        
      });


        this.cardsService.fetFavchData(this.navService.userId).pipe(
          
            ).subscribe({
              next: (cards: any[]) => {
                this.setHeartImgLink(cards, this.chosenCard); 
              },
              error: (error) => {
                console.error('Error:', error);
              },
              complete: () => {
              
              },
            });
        
  }
  
  setIndex(index){
    this.ForActive=index;
    this.mainImg=this.chosenCard.img[this.ForActive];
  }
incriment(){
  if(this.ForActive<this.chosenCard.img.length-1){
    this.ForActive++;
    this.mainImg=this.chosenCard.img[this.ForActive];
  }else{
    this.ForActive=0;
    this.mainImg=this.chosenCard.img[this.ForActive];
  }
}
decriment(){
  if(this.ForActive>0){
    this.ForActive--;
    this.mainImg=this.chosenCard.img[this.ForActive];
  }else{
    this.ForActive=this.chosenCard.img.length-1;
    this.mainImg=this.chosenCard.img[this.ForActive];
  }
}
  saveToFav(){
    const id = this.chosenCard.id;
   if(this.navService.userId===null){
    window.document.body.style.overflow = "hidden";
    this.Registration.setDisplayer(true);
    return;
   }
 
      const momxmareblis_idi= this.navService.userId
      const gancxadebis_idi=id;
      const postBody={momxmareblis_idi,gancxadebis_idi}
      if(this.heartimgLinks===this.heartimg){
          this.heartimgLinks=this.heartFilled;
   
            
     this.cardsService.sendFavoriteCards(postBody)
        
    
        }
        else{// write remove function of api 
             this.cardsService.DeleteFavoriteCards(postBody);
          this.heartimgLinks=this.heartimg;
        }

  }
  setHeartImgLink(savedCards: any, currentCard: any): void {

    const isSaved = savedCards.some(saved => saved.id == currentCard.id);

    this.heartimgLinks = isSaved ? this.heartFilled : this.heartimg;
  }
  


}
