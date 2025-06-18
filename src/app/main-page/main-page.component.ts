  import { Component, AfterViewInit, Inject, PLATFORM_ID, viewChild, ElementRef, ViewChild, OnInit, effect } from '@angular/core';

  import { MainPageDataService } from '../Services/mainPageService/main-page-data.service';
  import { HostListener } from '@angular/core';
import { AllCardsService } from '../Services/all-cards/all-cards.service';
import { PropertyInformationService } from '../Services/Property-info/property-information.service';
import { NavInfoService } from '../Services/NavService/nav-info.service';
import { concatMap } from 'rxjs';
import { AgentsService } from '../Services/agents/agents.service';
import { RegistrationService } from '../Services/registration/registration.service';
import { ReviewsService } from '../Services/reviews/reviews.service';
import { Router } from '@angular/router';

  @Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
  
  })
  export class MainPageComponent implements OnInit {
[x: string]: any;


  staticData:{headerTextList:string[]}=this.dataService.staticData  


  @ViewChild('RCard')Relement: ElementRef | undefined;

  //for Line 114
  @ViewChild('cardPlace') cardRow: ElementRef;
  @ViewChild('cardParent') Discover: ElementRef;
  
  isDragging = false;
  startX = 0;
  scrollLeft = 0;  
  TransformCof=0;
  LC=1
//before 114 line

  transform:number=0;
   PropButtons=[{class:true},{class:false},{class:false},{class:false},{class:false}];
    intervalId: any;
    booleanLeft=true;
    booleanRight=false;
    scrollY:any=0
    clickedIndex:number=0;
Languages=this.dataService
  WhyCards=this.dataService.WhyCards;
  AgentsInfo=this.dataService.AgentsInfo; //defoult value
  lastEl:any;
ReviewsData=this.dataService.ReviewData;
DiscoverPopularPlaces=this.dataService.DiscoverPopularPlaces;


    constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private allCardsService: AllCardsService,
     private navService:NavInfoService, private Registration:RegistrationService,
    private Reviews: ReviewsService,
    private Propinfo:PropertyInformationService ,private router:Router,
    private agentsServ:AgentsService, private dataService: MainPageDataService) {
      
    

    }
    heartimg='../../assets/Imges/Header/CardImges/icons/heart.svg'
    heartimgLinks=[ this.heartimg ,  this.heartimg, this.heartimg,  this.heartimg, this.heartimg, this.heartimg, this.heartimg, this.heartimg, this.heartimg];
  heartFilled='../../assets/Imges/StaticImg/StaticIcons/heart-fill - red.svg'
  heartedCards;

  showAgent=false;
  ngOnInit(): void {
    this.dataService.getDiscoveredProperties().pipe(
      concatMap((data) => {
      this.DiscoverPopularPlaces = data;
      return this.allCardsService.fetFavchData(this.navService.userId);
      })
    ).subscribe({
      next: (cards: any[]) => {
      this.heartedCards = cards;
      // this.heartimgLinks = new Array(this.DiscoverPopularPlaces.length).fill(this.heartimg);
      this.getMatchingIndexes(this.heartedCards, this.DiscoverPopularPlaces);
      },
      error: (error) => {
      console.error('Error:', error);
      },
 
    });

    this.agentsServ.fetchAgentData().subscribe({
      next: (data) => {
        this.AgentsInfo=[];
  
        data.map((item,index)=>{

          let imgLink 
          if(item.foto){
          imgLink=`users/${item.maili}/${item.saidentifikacio_kodi}/${item.foto}` 
          }else if(item.sqesi=="kaci" || item.sqesi=="male"){
            imgLink="../../assets/Imges/NavImg/man.png"
          }else if(item.sqesi=="qali"){
            imgLink='../../assets/Imges/NavImg/girl.png'
          }

          this.AgentsInfo.push({

  mainalt:item.angarishis_tipi || 'AgentsCard',

    imgLink:imgLink,

  Name: `${item.saxeli} ${item.gvari}` || 'Carls Issue',
  // status:item.angarishis_tipi == 'gayidvebis_menejeri'?  'Real Estate Agent' : 'Real Estate Manager', 
  status:item.atvirtuli_gancxadebebi,
  sociaslLinks:[
    ...(item.facebook_linki ? [{alt:'facebook' ,href:item.facebook_linki,IconLink:'../../assets/Imges/Header/CardImges/icons/icons8-facebook.svg'}] : []),
    ...(item.telegram_linki ? [{alt:'telegram' ,href:item.telegram_linki,IconLink:'../../assets/Imges/Header/CardImges/icons/telegram.svg'}] : []),
    ...(item.instagram_linki ? [{alt:'Instagram' ,href:item.instagram_linki,IconLink:'../../assets/Imges/Header/CardImges/icons/instagram.svg'}] : []),
    ...(item.linkedin_linki ? [{alt:'linkdIn' ,href:item.linkedin_linki,IconLink:'../../assets/Imges/Header/CardImges/icons/LinkedIn.png'}] : []),
    ...(item.whatsapp_linki ? [{alt:'whatsapp' ,href:item.whatsapp_linki,IconLink:'../../assets/Imges/Header/CardImges/icons/whatsapp.svg'}] : []),
  ],
  ...item
})

})

      },
      error: (err) => console.error('Error fetching agents:', err)
    }); 

    this.Reviews.fetchWebsiteReviews().subscribe({
      next: (data) => {
        this.ReviewsData=data.map((item)=>{
      return{

          Name:item.gamgzavnis_saxeli_gvari,
          imgLink:item.gamgzavnis_foto,
          Place: item.shefasebis_qula,
          Review:item.shefasebis_teqsti,
      }

        })
      }, 
error: (err) => console.error('Error fetching Web reviews:', err)
  });


  
}


    getMatchingIndexes(savedCards: any[], allCards: any[]): void {
 
    
      // ✅ Prevent errors by waiting until allCards is loaded
      if (!allCards || !Array.isArray(allCards) || allCards.length === 0) {
     
        return;
      }
    
      if (!savedCards || !Array.isArray(savedCards)) {
        console.error('Error: savedCards is null or not an array', savedCards);
        return;
      }
    
      if (!this.heartimgLinks.length) {
        this.heartimgLinks = new Array(allCards.length).fill(this.heartimg);
      }
    
      savedCards.forEach(savedCard => {
        const index = allCards.findIndex(card => card.gncxdebis_idi == savedCard.id);
        if (index !== -1) {
          this.heartimgLinks[index] = this.heartFilled;
        }
      });
    }


  dragged=false
  PstartX=0;
  transformer=0;
  startTransform=0;
  popularDragStart(event: MouseEvent | TouchEvent) {
    this.dragged = true;
  
    // Extract correct X position for both mouse and touch events
    const clientX = (event as TouchEvent).touches
      ? (event as TouchEvent).touches[0].pageX
      : (event as MouseEvent).pageX;
  
    this.PstartX = clientX;
    this.startTransform = this.transformer || 0;
    document.body.style.userSelect = "none";
  
    // Add event listeners for both mouse and touch
    document.addEventListener("mouseup", this.popularDragEnd as EventListener);
    document.addEventListener("touchend", this.popularDragEnd as EventListener);
  }
  
  popularDrag(event: MouseEvent | TouchEvent) {
    if (!this.dragged) return;
    event.preventDefault();
  
    // Extract correct X position
    const clientX = (event as TouchEvent).touches
      ? (event as TouchEvent).touches[0].pageX
      : (event as MouseEvent).pageX;
  
    const moveX = clientX - this.PstartX;
    const newTransform = this.startTransform + moveX * 1.6;
    const elementwidth=this.Discover.nativeElement.offsetWidth;
    
  
    // ✅ Prevent dragging too far left or right
    const minTransform = 0;
    const maxTransform = -this.Discover.nativeElement.offsetWidth + 600;
  
    this.transformer = Math.max(Math.min(newTransform, minTransform), maxTransform);

    this.buttons(true,this.transformer,elementwidth);
    this.Discover.nativeElement.style.transform = `translateX(${this.transformer}px)`;
  }
  
  popularDragEnd(event: MouseEvent | TouchEvent) {
    this.dragged = false;
    document.body.style.userSelect = "";
  
    // Remove event listeners after dragging stops
    document.removeEventListener("mouseup", this.popularDragEnd as EventListener);
    document.removeEventListener("touchend", this.popularDragEnd as EventListener);
  }
  buttons(bool: boolean, index: number, Elwidth?): void {
    if(bool==true){
  index=-index;
  if(index==0){
    this.PropButtons.forEach((item,i)=>{
      item.class=false;
    })
    this.PropButtons[0].class=true;

  }
const element= Elwidth/5;
for(let i=0;i<5;i++){
  let cardindex=element*i;
  if(index>cardindex && index<cardindex+element){
    this.PropButtons.forEach((item,i)=>{
      item.class=false;
    })
    this.PropButtons[i].class=true;
  }
}



} else{ 
  this.PropButtons.forEach((item,i)=>{
    item.class=false;
  })
  let tr=18;
  tr=tr*index;
if(index==0){
  this.Discover.nativeElement.style.transform = `translateX(${tr}px)`;
}else{
  this.Discover.nativeElement.style.transform = `translateX(${-tr}%)`;
}
  this.PropButtons[index].class=true;
}
  }

    
  navigate(id){
    this.Propinfo.navigateToCard(id);
  }


  saveToFav(i:number , info){  
 
    if(this.navService.userId===null){
      window.document.body.style.overflow = "hidden";
      this.Registration.setDisplayer(true);
      return;
     }
     
    const momxmareblis_idi= this.navService.userId
    const gancxadebis_idi=info.gncxdebis_idi
    const postBody={momxmareblis_idi,gancxadebis_idi}
    if(this.heartimgLinks[i]===this.heartimg){
        this.heartimgLinks[i]=this.heartFilled;
 
          
   this.allCardsService.sendFavoriteCards(postBody)
      
  
      }
      else{// write remove function of api 
        this.allCardsService.DeleteFavoriteCards(postBody);
        this.heartimgLinks[i]=this.heartimg;
      }

}

activeRight(){
  this.booleanLeft=false;
  this.booleanRight=true;
}
activeLeft(){
  this.booleanLeft=true;
  this.booleanRight=false;
 
}

ReviewMover(event: Event) {
  const element = event.target as HTMLElement;
  const classList = element.classList;

  const screenWidth = window.innerWidth;
  const cardWidth = screenWidth < 700 ? 316 : 515;
  const cardScreenCount = screenWidth < 1000 ? 1 : screenWidth < 1400 ? 2 : 3;

  if (classList.contains('LeftBtn') || classList.contains('Left')) {
    this.transform += cardWidth;
  } else if (classList.contains('RightBtn') || classList.contains('Right')) {
    this.transform -= cardWidth;
  }

  const maxOffset = 0;
  const minOffset = -(this.ReviewsData.length - cardScreenCount) * cardWidth;

  this.transform = Math.min(maxOffset, Math.max(this.transform, minOffset));

  this.Relement.nativeElement.style.transform = `translate3d(${this.transform}px, 0, 0)`;
}
@HostListener('window:scroll', ['$event'])
onScroll(event: Event): void {
  this.scrollY = window.scrollY || window.pageYOffset;
}

@HostListener('document:mouseup')
onMouseUp(): void {
  if (this.isDragging) this.onDragEnd();
}

@HostListener('document:mouseleave')
onMouseLeave(): void {
  if (this.isDragging) this.onDragEnd();
}

onDragStart(event: MouseEvent): void {
  this.isDragging = true;
  this.startX = event.pageX - this.cardRow.nativeElement.offsetLeft;
  this.scrollLeft = this.cardRow.nativeElement.scrollLeft;
}

onDrag(event: MouseEvent): void {
  if (!this.isDragging) return;
  event.preventDefault();

  const screenWidth = window.innerWidth;
  const cardWidth = screenWidth < 700 ? 316 : 515;

  const x = event.pageX - this.cardRow.nativeElement.offsetLeft;
  const walk = (x - this.startX) * 2;

  this.transform += event.movementX;

  // Scroll fallback if needed, or just rely on transform
  this.cardRow.nativeElement.scrollLeft = this.scrollLeft - walk;

  this.Relement.nativeElement.style.transition = '0s';
  this.Relement.nativeElement.style.transform = `translate3d(${this.transform}px, 0px, 0px)`;
}

onDragEnd(): void {
  this.isDragging = false;

  const screenWidth = window.innerWidth;
  const cardWidth = screenWidth < 700 ? 316 : 515;
  const visibleCount = screenWidth < 1000 ? 1 : screenWidth < 1400 ? 2 : 3;

  const totalCards = this.ReviewsData.length;
  const maxIndex = totalCards - visibleCount;

  this.TransformCof = Math.round(this.transform / cardWidth);

 
  if (this.transform > 0) {
    this.transform = -maxIndex * cardWidth;
  } else if (this.transform <= -((totalCards - 2) * cardWidth)) {
    this.transform = 0;
  } else {
    this.transform = this.TransformCof * cardWidth;
  }

  this.LC = this.TransformCof;

  this.Relement.nativeElement.style.transition = '0.8s';
  this.Relement.nativeElement.style.transform = `translate3d(${this.transform}px, 0px, 0px)`;
}


displayAgent(Agent){

this.agentsServ.ShowAgent.set(Agent)
this.router.navigate(['/Agent']); 

}

ngOnDestroy(): void {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }

    }

 


  }
