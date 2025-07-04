import { Injectable } from '@angular/core';
import { EngService } from '../Languages/eng/eng.service';
import { GeoService } from '../Languages/geo/geo.service';
import { RusService } from '../Languages/rus/rus.service';
import { MainPageDataService } from '../mainPageService/main-page-data.service';
import { text } from 'stream/consumers';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  PartnerImges=[
    '../../assets/Imges/Footer/PartnersImg/11.jpg','../../assets/Imges/Footer/PartnersImg/12.jpg','../../assets/Imges/Footer/PartnersImg/13.jpg'
    ,'../../assets/Imges/Footer/PartnersImg/14.jpg','../../assets/Imges/Footer/PartnersImg/15.jpg','../../assets/Imges/Footer/PartnersImg/16.jpg',
    '../../assets/Imges/Footer/PartnersImg/17.jpg'
  ]

  FooterData={
    FindHouse:{mainText:'New real estate buying and selling and renting portal in Georgia',
              location:'Georgia',
              Number:'+995 32 21 14 844',
              Email:'infofindhous@gmail.com'
    },
  Navigation:[
                { list1: 'მთავარი', routerLink1: '/'  },
          {list1: 'კონტაქტი',  routerLink1: '/contact'},
          {list1: 'ჩვენ შესახებ', routerLink1: '/about' },
          { list1: 'უძრავი ქონება', routerLink1: '/allCard' },
       
          
  ],
  
}

   staticValues = {
    headerFP: 'ჩვენი პარტნიორები', 
    pFP: 'კომპანიები, რომლებიც წარმოადგენენ ჩვენს ინტერესებს.', 
    NavFooter: 'ნავიგაცია', 
  
    NewsFooter: 'საინფორმაციო მიმოწერა', 
    NewsFooterText: 'გაიარეთ რეგისტრაცია , რათა მიიღოთ უახლესი განახლებები და შეთავაზებები. გამოიწერეთ სიახლეები თქვენს ელფოსტაზე.', 
    NewsFooterBtn: 'გამოწერა', 
    NewsFooterPlaceHolder: 'შეიყვანეთ  ელ.ფოსტა',
        terms:'წესები და პირობები',
     Policy:'კონფიდენციალურობის პოლიტიკა',
  }
  

  constructor( private Engservice:EngService, private GeoService:GeoService,private RusService:RusService, mainService:MainPageDataService ,private htto:HttpClient){
if(mainService.localStorage){
  switch (mainService.localStorage) {
    case 'ENG':
  this.staticValues=this.Engservice.SFooter;
  this.FooterData=this.Engservice.FooterData;
    break;
      case 'GEO':
        this.staticValues=this.GeoService.SFooter;
        this.FooterData=this.GeoService.FooterData;
      break;
      case 'RUS':
        this.staticValues=this.RusService.SFooter
        this.FooterData=this.RusService.FooterData;
        break;
  
}   
}
}
subscrieToEmail(email: string): void {
  this.htto.post('subscribe.php', { emaili:email })
}
}