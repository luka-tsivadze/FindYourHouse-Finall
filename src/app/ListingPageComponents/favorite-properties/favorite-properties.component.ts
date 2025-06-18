import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AllCardsService } from '../../Services/all-cards/all-cards.service';
import { NavInfoService } from '../../Services/NavService/nav-info.service';
import { error } from 'console';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';
import { ListingServiceService } from '../../Services/listing-service/listing-service.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-favorite-properties',
  templateUrl: './favorite-properties.component.html',
  styleUrl: './favorite-properties.component.scss'
})
export class FavoritePropertiesComponent {
favCardEl = [];

  starObject=[{star:1},{star:2},{star:3},{star:4},{star:5}]
  pages;
  ActivePage = 0;
  index = 0;
  pagesInfo = [];
  finalInfo = [];
activePage=[];
reviewIndices=[]
  pageIndices=[]
  staticData={
    Header:'Top Properties',
    date:'Date Added',
    Views:'Views',
    action:'Actions',
    rew:"Reviews",
    Ed:'Edit',
    ago:'Months Ago',
    prev:'Previous',
    next:'Next'
  }
  constructor(private http: HttpClient, private idplace:NavInfoService ,
    private allCardsService:AllCardsService ,private cdr: ChangeDetectorRef, private lang:LanguageChooserService , private sharedService:ListingServiceService) { 


  }
  ngOnInit() {
    this.staticData = this.lang.chosenLang.myProp;

    this.allCardsService.fetFavchData(this.idplace.userId, true).pipe(
      switchMap((filteredData) => {
        this.favCardEl = filteredData;
        this.pageFunction();
        if (this.favCardEl.length === 0) return of([]); 
        return this.sharedService.views(this.favCardEl);
      })
    ).subscribe({
      next: (dataWithViews) => {
        this.favCardEl = dataWithViews;
        this.pageFunction(); 
      },
      error: (err) => console.error('ERROR:', err),
    });
    
  }


  


 removeCard(id: number) {
  const postBody = { momxmareblis_idi: this.idplace.userId, gancxadebis_idi: id };
    this.http.post('delete-saved-house.php', postBody ).subscribe({
      next: (response) => {
       
       this.favCardEl = this.favCardEl.filter((card) => card.id !== id);

     this.allCardsService.fetFavchData(this.idplace.userId ,true).subscribe({});
       this.pageFunction();
       this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error:', error);
      },
   
    });
}

  pageFunction() {
    this.index = 0; // Reset index for pagination
    this.finalInfo = []; // Clear pagination data
    this.pageIndices = [];
    if (this.favCardEl.length > 6) {

      this.pages = Math.ceil(this.favCardEl.length / 6);
      
      for (let i = 0; i < this.pages; i++) {
        this.pageIndices.push(i);
        this.pagesInfo = []; // Reset for each page
        // Loop to add 6 items per page (or less for the last page)
        for (let j = 0; j < 6 && this.index < this.favCardEl.length; j++) {
          this.pagesInfo.push(this.favCardEl[this.index]);
          this.index++;
        }
        // Clone the pagesInfo array before resetting it
        this.finalInfo.push([...this.pagesInfo]);
      }
      console.log('allCardEl', this.finalInfo);
    this.activePage=this.finalInfo[0]

    }else{
      this.pageIndices.push(0);
      this.finalInfo.push([...this.favCardEl]);
      this.activePage=this.finalInfo[0]

    }
  }

  getStarArray(review: number): { filled: boolean }[] {
    return Array.from({ length: 5 }, (_, index) => ({ filled: index < review }));
  }

  chosenPage(index) {
if(this.finalInfo[index]){
  this.activePage = this.finalInfo[index]
      
    this.ActivePage = index;
  }
}
}

