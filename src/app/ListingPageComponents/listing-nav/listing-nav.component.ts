import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Inject, NgZone, Output, PLATFORM_ID } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavInfoService } from '../../Services/NavService/nav-info.service';

import { EngService } from '../../Services/Languages/eng/eng.service';
import { GeoService } from '../../Services/Languages/geo/geo.service';
import { RusService } from '../../Services/Languages/rus/rus.service';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';
import { ListingServiceService } from '../../Services/listing-service/listing-service.service';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-listing-nav',
  templateUrl: './listing-nav.component.html',
  styleUrl: './listing-nav.component.scss'
  ,animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ListingNavComponent {

  scrollY: number=0
 
  showLeftNav=false;
 
ShowImg=false;
displayElement=false;
showLanguages=false;
navLang=this.navService.Languages;
chosenLang='GEO'
ProfileSettings;
NavElements:any=this.navService.MenuBar;
SignedIn:any
staticElements: any;
Displayer=false
@Output() valueChange = new EventEmitter<string>();
editItemSubscription: any;


LeftNavInfo=this.lang.chosenLang.LeftInfo;
activeElement=this.LeftNavInfo[4].Text;

showRespNav={bool:false ,iconSrc:'../../../assets/Imges/NavImg/list-outline.svg'};


  constructor(private router: Router ,private navService: NavInfoService,private lang:LanguageChooserService,private EngService:EngService 
    ,private GeoService:GeoService ,private RusService:RusService,private listingService:ListingServiceService,
    @Inject(PLATFORM_ID) private platformId: Object){
    
if (isPlatformBrowser(this.platformId)) {
  this.activeElement=localStorage.getItem('ActiveElement')
  
  if (localStorage.getItem('Language')) {
    this.chosenLang = localStorage.getItem('Language');
  }
  
  switch (this.chosenLang) {
    case 'GEO':
      this.staticElements = this.GeoService.NavG;
      this.NavElements=this.GeoService.MenuBar;
      this.ProfileSettings=this.GeoService.MenuBar.profileSettings;
      break;
  
    case 'ENG':
      this.staticElements = this.EngService.NavE;
      this.NavElements=this.EngService.MenuBar;
      this.ProfileSettings=this.EngService.MenuBar.profileSettings
      break;
  
    case 'RUS':
      this.staticElements = this.RusService.NavR;
      this.NavElements=this.RusService.MenuBar;
      this.ProfileSettings=this.RusService.MenuBar.profileSettings;
      break;
  
  
  }
  }
  
  
  this.SignedIn=this.navService.IsSignedIn;
        // Set active element from localStorage or default to 'Add Property'
        this.activeElement = localStorage.getItem('ActiveElement') || 'Add Property';
  
   
  
  

  }


  ngOnInit(): void {
    this.valueChange.emit(this.activeElement);
    console.log(`Active Element on Init: ${this.activeElement}`);
    this.listingService.editItemId$.subscribe((id) => {

      this.activeElement=localStorage.getItem('ActiveElement');
      console.log(`Received editItemId:`, this.activeElement);
    })
  }

  ngOnDestroy(): void {
    if (this.editItemSubscription) {
      this.editItemSubscription.unsubscribe(); // Correctly unsubscribing
    }
  }
  profileSettings(el){

    if(el=='Log Out'){

   localStorage.removeItem('id');
   localStorage.removeItem('ActiveElement');
   this.router.navigate(['/'])
   window.location.reload();
  
  }else if(el=='Edit Profile'){

    localStorage.setItem('ActiveElement', 'Profile')
    this.activeElement='Profile';



}else{ 
  localStorage.setItem('ActiveElement',  el)
  this.activeElement=el;
}
this.valueChange.emit(this.activeElement); 
}
  chosenLanguage(element: number){
    localStorage.removeItem('Language');
    this.navService.chosenLang=this.navLang[element];

  this.chosenLang=this.navService.chosenLang;
  localStorage.setItem('Language', this.chosenLang);
  
  if(this.chosenLang=='GEO'){
    this.staticElements=this.GeoService.NavG

  }else if(this.chosenLang=='ENG'){
this.staticElements=this.EngService.NavE
  }else if(this.chosenLang=='RUS'){
    this.staticElements=this.RusService.NavR
  }
this.showLanguages=false;
window.location.reload();

  }
  displayEl(){
this.displayElement=!this.displayElement;
  }
  displayLanguages(){
this.showLanguages=!this.showLanguages;
  }
  activedPage(element){
 
    localStorage.setItem('ActiveElement',element)
    this.activeElement=element;
    this.valueChange.emit(this.activeElement);
  }
  
  uploadToLocal(info){
  
    localStorage.setItem('ActiveElement',info)
    this.activeElement=info;
    this.valueChange.emit(this.activeElement);
  

  }
  showResponsiveNav(){

    if(this.showRespNav.bool){
      this.showRespNav.bool=false;
      this.showRespNav.iconSrc='../../../assets/Imges/NavImg/list-outline.svg'
  }else{
    this.showRespNav.bool=true;  

        this.showRespNav.iconSrc='../../assets/Imges/StaticImg/StaticIcons/x.svg'
  }
}
}
