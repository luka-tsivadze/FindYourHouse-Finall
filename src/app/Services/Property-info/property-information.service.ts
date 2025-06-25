import { Injectable, Type } from '@angular/core';
import { AllCardsService } from '../all-cards/all-cards.service';


import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyInformationService {
cardId;
chosenCard = new BehaviorSubject<any>(null);
  RecentProp = [{
    img: '../../../assets/Imges/StaticImg/CardImges/fp-1.jpg',
    type: 'Family House',
    price: 1200000
  }
    , {
    img: '../../../assets/Imges/StaticImg/CardImges/fp-2.jpg',
    type: 'Family House',
    price: 200000
  },

  ]
  featuredProp = [{
    img: '../../../assets/Imges/StaticImg/CardImges/fp-1.jpg',
    type: 'Family House',
    price: 200000,
    currency: '₾',
    basePrice: 200000,
    For: 'For Sale',
    locationCity: 'New York',
    area: '720',
    rooms: '8',
    curConverted: false,
    id: 0,
    bedrooms: '3',
  },
 

  ]

  
 similarProp = [   {
  featuredBtn: true,
  For: 'For Sale',
  imgLink: '../../assets/Imges/Header/CardImges/F1.jpg',
  alt: 'Luxury family house villa for sale',
  header: 'Real Luxury Family House Villa',
  location: 'Est St, 77 - Central Park South, NYC',
  bedrooms: 6,
  bathrooms: 3,
  area: 720,
  garages: 2,
  price: 110000,
  basePrice: 110000,
  currency: '₾',
  curConverted: false,
  profileName: 'john Doe',
  uploadmonth: 1,
  
  id:0,
  
},
]

imgLink=[];
floorimg;
alldata;
video;
videoLin;
floorimgLink;
userId;
catchedData = new BehaviorSubject<any[]>([]);
constructor(private route:Router , private allcards:AllCardsService, private http:HttpClient) {

  if(localStorage.getItem('id')){
    this.userId = localStorage.getItem('id');
  }

}

navigateToCard(id: number) {
  this.setCardId(id);
this.route.navigate(['/allCards', id]);
}




setCardId(cardId: number) {
  this.cardId = cardId;

  // Find the selected card from the backend data
  
  const selectedCard = this.allcards.back_end_data.find((card) => card.idi == this.cardId);

const images = JSON.parse(selectedCard.fotoebi);

try {
  this.floorimg = selectedCard.binis_naxazi ? JSON.parse(selectedCard.binis_naxazi) : false;
} catch (error) {
  console.error("Invalid JSON in binis_naxazi:", error);
  this.floorimg = false;
}
try {
  this.video = JSON.parse(selectedCard.video) || false;
} catch (e) {
  this.video = false;
}
if (Array.isArray(images) && images.length > 0) {
  this.imgLink = [];
  for (let i = 0; i < images.length; i++) {
    this.imgLink.push(`houses/${selectedCard.amtvirtvelis_maili}/${selectedCard.gancxadebis_saidentifikacio_kodi}/photos/${images[i]}`);
  }
}
  this.floorimgLink=`houses/${selectedCard.amtvirtvelis_maili}/${selectedCard.gancxadebis_saidentifikacio_kodi}/blueprints/${this.floorimg[0]}`;
  this.videoLin = this.video?.length > 0 
  ? `houses/${selectedCard.amtvirtvelis_maili}/${selectedCard.gancxadebis_saidentifikacio_kodi}/video/${this.video[0]}`
  : null;


  if (selectedCard) {
    // Transform the backend data into the desired format for chosenCard
    // console.log('Selected card:', selectedCard); 
   let timeDifference 
    if (selectedCard.tipi != 'Land Plot' && selectedCard.tipi != 'Garage') {
    
   timeDifference=new Date(
        new Date(selectedCard.gancxadebis_atvirtvis_tarigi).setFullYear(
          new Date(selectedCard.gancxadebis_atvirtvis_tarigi).getFullYear() -
          this.extractYears(selectedCard.asaki || '0')) ).toISOString().split('T')[0] 
    }else{
      timeDifference=0;
    }

    const temp= {
      featuredBtn: true, // Static value as per requirements
      For: selectedCard.garigebis_tipi || 'Unknown',
      email: selectedCard.amtvirtvelis_maili || 'Unknown',
      price:  Number((selectedCard.fasi || '').toString().replace(/[^\d]/g, ''))|| 'Price Unavailable',
      currency: selectedCard.fasis_valuta || '₾',
      purePrice: Number((selectedCard.fasi || '').toString().replace(/[^\d]/g, ''))|| 'Price Unavailable',
      Type: selectedCard.tipi || 'Unknown',
      imgLink: this.imgLink[0] || 'No Image',
      alt: selectedCard.satauri || 'No Title',
      header: selectedCard.satauri || 'No Title',
      location: selectedCard.misamarti || 'Unknown Location',
      bedrooms: parseInt(selectedCard.sadzinebeli) || 0,
      bathrooms: parseInt(selectedCard.sveli_wertilebis_raodenoba) || 0,
      area: parseInt(selectedCard.fartobi) || 0,
     Nomeri:selectedCard.telefonis_nomeri || 'Unknown',
      garages: 0, // Static value
  
      profileImg: '../../../assets/Imges/StaticImg/CardImges/ts-4.jpg', // Static placeholder
      profileName: selectedCard.momxmareblis_saxeli || 'Unknown',
      uploadmonth: new Date(selectedCard.statusis_gaaqtiurebis_tarigi).getMonth() + 1 || 1,

      YearBuilt: timeDifference,
      id: parseInt(selectedCard.idi),
      latitude:  selectedCard.mapis_grdzedi, // Static placeholder
      longitude: selectedCard.mapis_ganedi, // Static placeholder
      Rooms: parseInt(selectedCard.otaxebis_raodenoba) || 0,

      qalaqi: selectedCard.qalaqi || 'Unknown',

      Amenities: [],
      img: this.imgLink,
      floorPlan: this.floorimgLink || false, 
      videoLink: this.videoLin || false,
      describtion: selectedCard.mokle_agwera, 
      momxmareblis_id: selectedCard.amtvirtvelis_idi,

      saavadmyofos_dasaxeleba_1: selectedCard.saavadmyofos_dasaxeleba_1 || null,
      saavadmyofos_dasaxeleba_2: selectedCard.saavadmyofos_dasaxeleba_2 || null,
      saavadmyofos_dasaxeleba_3: selectedCard.saavadmyofos_dasaxeleba_3 || null,
      saavadmyofos_distancia_1: selectedCard.saavadmyofos_distancia_1 || null,
      saavadmyofos_distancia_2: selectedCard.saavadmyofos_distancia_2 || null,
      saavadmyofos_distancia_3: selectedCard.saavadmyofos_distancia_3 || null,

      skolis_dasaxeleba_1: selectedCard.skolis_dasaxeleba_1 || null,
      skolis_dasaxeleba_2: selectedCard.skolis_dasaxeleba_2 || null,
      skolis_dasaxeleba_3: selectedCard.skolis_dasaxeleba_3 || null,
      skolis_distancia_1: selectedCard.skolis_distancia_1 || null,
      skolis_distancia_2: selectedCard.skolis_distancia_2 || null,
      skolis_distancia_3: selectedCard.skolis_distancia_3 || null,

      transportis_dasaxeleba_1: selectedCard.transportis_dasaxeleba_1 || null,
      transportis_dasaxeleba_2: selectedCard.transportis_dasaxeleba_2 || null,
      transportis_dasaxeleba_3: selectedCard.transportis_dasaxeleba_3 || null,
      transportis_distancia_1: selectedCard.transportis_distancia_1 || null,
      transportis_distancia_2: selectedCard.transportis_distancia_2 || null,
      transportis_distancia_3: selectedCard.transportis_distancia_3 || null,

      
      similarProp: [],
      views:'0',

 
    };


    // Populate Amenities based on boolean fields
    const language = localStorage.getItem('Language') || 'ENG';

    const amenitiesMap: { [key: string]: { ENG: string; GEO?: string; RUS?: string } } = {
      aivani: { ENG: 'Balcony', GEO: 'აივანი', RUS: 'Балкон' },
      kondincioneri: { ENG: 'Air Conditioning' , GEO:'კონდინციონერი', RUS: 'Кондиционер' },
      mikrotalguri: { ENG: 'Microwave', GEO:'მიკროტალღური ღუმელი', RUS: 'Микроволновая печь' },
      televizia_wifi: { ENG: 'WiFi & TV' , GEO:'ტელევიზია და ინტერნეტი', RUS: 'Телевидение и Wi-Fi' },
      sacurao_auzi: { ENG: 'Swimming Pool',GEO:'საცურაო აუზი', RUS: 'Бассейн' },
      sportuli_darbazi: { ENG: 'Gym' ,GEO:'სპორტული დარბაზი', RUS: 'Спортивный зал' },
      signalizacia: { ENG: 'Security System', GEO:'სიგნალიზაცია', RUS: 'Сигнализация' },
      macivari: { ENG: 'Refrigerator', GEO:'მაცივარი', RUS: 'Холодильник' },
      samrecxao_otaxi: { ENG: 'Laundry Room', GEO:'სამრეცხაო ოთახი', RUS: 'Прачечная' },
      centraluri_gatboba: { ENG: 'Central Heating', GEO:'ცენტრალური გათბობა', RUS: 'Центральное отопление' }, //need back-end helpo

      sardafi: { ENG: 'Basement', GEO:'სარდაფი', RUS: 'Подвал' },
      lifti: { ENG: 'Elevator', GEO:'ლიფტი', RUS: 'Лифт' },
     garaji: { ENG: 'Garage', GEO:'გარაჟი', RUS: 'Гараж' },
    bolo_sartuli: { ENG: 'Top Floor', GEO:'ბოლო სართული', RUS: 'Последний этаж' },
    bunebrivi_airi:{ ENG: 'Natural Air', GEO:'ბუნებრივი აირი', RUS: 'Природный газ' },
    satavso:{ ENG: 'Storage', GEO:'სათავსო', RUS: 'Хранилище' },

    };
    
    Object.keys(amenitiesMap).forEach(key => {
      if (selectedCard[key] === "true" || selectedCard[key] === true) {
        temp.Amenities.push(amenitiesMap[key][language] || amenitiesMap[key].ENG);
      }
    });


    this.chosenCard.next(temp);
    
    
    // Log the transformed card for debugging

  } else {
    console.error('No card found with the given ID:', this.cardId);
  }
}
extractYears(rangeStr: string): number {
  const regex = /\d+-(\d+)/; // Match number range "0-15"
  const match = rangeStr.match(regex);
  if (!rangeStr || typeof rangeStr !== 'string') return 0;
  if (match && match[1]) {
    return parseInt(match[1], 10); // Extract and return the second number
  } else {
    throw new Error('Invalid range string format'); // Handle invalid input gracefully
  }
}

Sendresp=new BehaviorSubject<any>(false);
SendUserMessage(form):BehaviorSubject<any> {
  this.http.post('send_user_message.php', form)
  .subscribe({
    next: (data) => { ;
      this.Sendresp.next(data);
     },
    error: (error) => { console.error('Error sending message:', error);
    
     }
  });
return this.Sendresp;

}


RecentProp$=new BehaviorSubject<any>(false);
getRecentProp():Observable<any>{
  if(this.RecentProp$.value) return this.RecentProp$;
  this.http.get('get_new_houses.php').subscribe({
    next: (data) => { this.RecentProp$.next(data); },
    error: (error) => { console.error('Error fetching recent properties:', error); }
})
return this.RecentProp$;
}

getSimilarProp(chosenCard): Observable<any> {
  const body = {
    garigebis_tipi: chosenCard.garigebis_tipi,
    qalaqi: chosenCard.qalaqi,
    fasi: chosenCard.fasi,
    // fasi: chosenCard.fasi + chosenCard.fasis_valuta,
    fartobi: chosenCard.fartobi
  };

  return new Observable((observer) => {
    this.http.post('get_similar_houses.php', body).subscribe({
      next: (data) => {
        observer.next(data);
        observer.complete();
      },
      error: (error) => {
        console.error('Error fetching similar properties:', error);
        observer.next(this.similarProp);
        observer.complete();
      }
    });
  });
}

}
