import { Component } from '@angular/core';
import { AllCardsService } from '../../Services/all-cards/all-cards.service';
import { PropertyInformationService } from '../../Services/Property-info/property-information.service';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';
import { ViewsService } from '../../Services/views/views.service';
import { switchMap, tap } from 'rxjs';

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
 unit;
  constructor( private cardInfo:PropertyInformationService ,private lang:LanguageChooserService , private views:ViewsService) {
this.staticH2=this.lang.chosenLang.DetailedInfo.CardGallery1;
this.unit=this.lang.chosenLang.DetailedInfo.unit;
   }
   ngOnInit(): void {
    this.cardInfo.chosenCard
      .pipe(
        tap((card) => {
          console.log('card::',card);
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

}
