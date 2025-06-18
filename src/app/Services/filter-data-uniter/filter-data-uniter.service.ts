import { Injectable } from '@angular/core';
import { AllCardsService } from '../all-cards/all-cards.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

interface FilterData {
  prop?: string;
  local?: string;
  areaMin?: number;
  areaMax?: number;
  priceMin?: number;
  priceMax?: number;
  statusi?: string;
  badrooms?: string;
  bathrooms?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class FilterDataUniterService {
  finalData: FilterData = {};
  allCards: any[] = [];
  wasCalled = false;

  private filteredCardsSubject = new BehaviorSubject<any[]>([]);
  filtredCards$ = this.filteredCardsSubject.asObservable();

  // Moved the mapping out of the function for reusability.
  private bilingualMapping = {
    tipi: {
      Apartment: ['Apartment', 'ბინა'],
      House: ['House', 'სახლი'],
      Commercial: ['Commercial', 'კომერციული'], //first words should match 
      Garage: ['Garage', 'გარაჟი'],
      "Land Plot": ['Land Plot', 'მიწის ნაკვეთი'],
    },
    garigebis_tipi: {
      'For Sale': ['For Sale', 'იყიდება'],
      'For Rent': ['For Rent', 'ქირავდება'],
      'Rented daily': ['Rented daily', 'ქირავდება დღიურად'],
      Pledge: ['Pledge', 'გირავდება'],
      'Apartments Under Construction': ['Apartments Under Construction', '⁠მშენებარე ბინები'],
    },
    citys: {
      Tbilisi: ['Tbilisi', 'თბილისი'],
      Batumi: ['Batumi', 'ბათუმი'],
      Kutaisi: ['Kutaisi', 'ქუთაისი'],
      Rustavi: ['Rustavi', 'რუსთავი'],
      Zugdidi: ['Zugdidi', 'ზუგდიდი'],
      Telavi: ['Telavi', 'თელავი'],
      Bakuriani: ['Bakuriani', 'ბაკურიანი'],
      Kobuleti: ['Kobuleti', 'ქობულეთი'],
      Gori: ['Gori', 'გორი'],
      Poti: ['Poti', 'ფოთი'],
      Marneuli: ['Marneuli', 'მარნეული'],
      Khashuri: ['Khashuri', 'ხაშური'],
      Samtredia: ['Samtredia', 'სამტრედია'],
      Zestaponi: ['Zestaponi', 'ზესტაფონი'],
      Akhaltsikhe: ['Akhaltsikhe', 'ახალციხე'],
      Senaki: ['Senaki', 'სენაკი'],
      Ozurgeti: ['Ozurgeti', 'ოზურგეთი'],
      Kaspi: ['Kaspi', 'კასპი'],
      Chiatura: ['Chiatura', 'ჭიათურა'],
      Gardabani: ['Gardabani', 'გარდაბანი'],
      Borjomi: ['Borjomi', 'ბორჯომი'],
      Sagarejo: ['Sagarejo', 'საგარეჯო'],
      Kvareli: ['Kvareli', 'ყვარელი'],
      Bolnisi: ['Bolnisi', 'ბოლნისი'],
      Tkibuli: ['Tkibuli', 'ტყიბული'],
      Khoni: ['Khoni', 'ხონი'],
      Tskaltubo: ['Tskaltubo', 'წყალტუბო'],
      Akhalkalaki: ['Akhalkalaki', 'ახალქალაქი'],
      Mtskheta: ['Mtskheta', 'მცხეთა'],
      Gurjaani: ['Gurjaani', 'გურჯაანი'],
      Dusheti: ['Dusheti', 'დუშეთი'],
      Lanchkhuti: ['Lanchkhuti', 'ლანჩხუთი'],
      Lagodekhi: ['Lagodekhi', 'ლაგოდეხი'],
      Sachkhere: ['Sachkhere', 'საჩხერე'],
      Dedoplistskaro: ['Dedoplistskaro', 'დედოფლისწყარო'],
      Abasha: ['Abasha', 'აბაშა'],
      Martvili: ['Martvili', 'მარტვილი'],
      Ninotsminda: ['Ninotsminda', 'ნინოწმინდა'],
      Tsalka: ['Tsalka', 'წალკა'],
      Vani: ['Vani', 'ვანი'],
      Dmanisi: ['Dmanisi', 'დმანისი'],
      Tsalenjikha: ['Tsalenjikha', 'წალენჯიხა'],
      Keda: ['Keda', 'ქედა'],
    },
  };

  constructor(private allCardsService: AllCardsService, private http: HttpClient) {}

  transferData(data: any, filterNumber: number): void {
    this.wasCalled = true;

    this.finalData = {};

    if (filterNumber === 1) {
      this.finalData.prop = data.Propselect || '0';
      this.finalData.local = data.locselect || '0';

      if (data.sliders && data.sliders.length >= 2) {
        this.finalData.areaMin = data.sliders[0]?.min || 0;
        this.finalData.areaMax = data.sliders[0]?.max || 0;
        this.finalData.priceMin = data.sliders[1]?.min || 0;
        this.finalData.priceMax = data.sliders[1]?.max || 0;
      } else {
        this.finalData.areaMin = 0;
        this.finalData.areaMax = 0;
        this.finalData.priceMin = 0;
        this.finalData.priceMax = 0;
      }

      this.finalData.statusi = data.propstatus || '0';
      this.finalData.badrooms = data.selectInputs?.[0]?.value || '0';
      this.finalData.bathrooms = data.selectInputs?.[1]?.value || '0';

      // Fix conditional checks (compare both values explicitly)
      if (
        data.selectInputs?.[1]?.value === 'Bathrooms' ||
        data.selectInputs?.[1]?.value === 'სააბაზანო'
      ) {
        this.finalData.bathrooms = '0';
      }
      if (
        data.selectInputs?.[0]?.value === 'Bedrooms' ||
        data.selectInputs?.[0]?.value === 'საძინებელი'
      ) {
        this.finalData.badrooms = '0';
      }

      const features = [
        'Air Conditioning',
        'Microwave',
        'Refrigerator',
        'Outdoor Shower',
        'Window Covering',
        'Alarm',
        'Swimming Pool',
        'Central Heating',
        'Laundry Room',
        'Gym',
        'TV Cable & wifi',
        'Dryer',
        'Washer',
        'garage',
        'lifti',
        'bolo_sartuli',
        'bunebrivi_airi',
        'satavso',
        'sardafi', 
      ];
      features.forEach((feature) => {
        this.finalData[feature] = (data.checkboxes || []).some(
          (box: any) => box.name === feature && box.checked
        );
      });
    } else if (filterNumber === 2) {
      this.finalData.prop = data.propertyType || '0';
   
      this.finalData.local = data.location || '0';

      this.finalData.areaMin = data.areaMin || 0;
      this.finalData.areaMax = data.areaMax || 0;
      this.finalData.priceMin = data.priceMin || 0;
      this.finalData.priceMax = data.priceMax || 0;
      this.finalData.statusi = data.propertyStatus || '0';
      this.finalData.badrooms = data.bedrooms !== 0 ? data.bedrooms : '0';
      this.finalData.bathrooms = data.bathrooms !== 0 ? data.bathrooms : '0';

      const features = [
        'airConditioning',
        'wifi',
        'swimmingPool',
        'tvCable',
        'centralHeating',
        'dryer',
        'gym',
        'washer',
        'alarm',
        'refrigerator',
        'windowCovering',
        'outdoorShower',
        'laundryRoom',
        'microwave',

        
        'garage',
        'lifti',
        'bolo_sartuli',
        'bunebrivi_airi',
        'satavso',
        'sardafi',

      ];
      features.forEach((feature) => {
        this.finalData[feature] = data[feature] || false;
      });
    }

  
    this.allCards = this.allCardsService.back_end_data;

    const filtered = this.filterCards(this.allCards, this.finalData);
    this.filteredCardsSubject.next(filtered);
  }

  filterCards(allCards: any[], filter: FilterData): any[] {
    const normalizeValue = (value: string, map: Record<string, string[]>): string | undefined => {
      if (!value) return undefined;
      const lowerValue = value.toLowerCase();
      return Object.keys(map).find((key) =>
        map[key].some((mappedValue) => mappedValue.toLowerCase() === lowerValue)
    );
  };

  return allCards.filter((card) => {
      const normalizedTipi =
        normalizeValue(card.tipi, this.bilingualMapping.tipi) || card.tipi;
      const normalizedGarigebisTipi =
        normalizeValue(card.garigebis_tipi, this.bilingualMapping.garigebis_tipi) ||
        card.garigebis_tipi;
      const normalizedCity =
        normalizeValue(card.qalaqi, this.bilingualMapping.citys) || card.qalaqi;

      const matchesPropertyStatus =
        filter.statusi === '0' ||
        this.bilingualMapping.garigebis_tipi[filter.statusi]?.includes(
          normalizedGarigebisTipi
        );
      const matchesPropertyType =
        filter.prop === '0' ||
        this.bilingualMapping.tipi[filter.prop]?.includes(normalizedTipi);
      const matchesLocation =
        filter.local === '0' ||
        this.bilingualMapping.citys[filter.local]?.includes(normalizedCity);
      const matchesBedrooms =
        filter.badrooms === '0' || card.sadzinebeli === filter.badrooms;
      const matchesBathrooms =
        filter.bathrooms === '0' ||
        card.sveli_wertilebis_raodenoba === filter.bathrooms;

const cardArea = parseFloat(
  (card.fartobi || '')
    .replace(/\s/g, '')       // remove spaces
    .replace(',', '.')        // convert comma to dot
    .replace(/[^0-9.]/g, '')  // remove other symbols
) || 0;


const cardPrice = parseFloat(
  (card.fasi || '')
    .replace(/\s/g, '')
    .replace(',', '.')
    .replace(/[^0-9.]/g, '')
) || 0;

      const matchesArea =
        cardArea >= (filter.areaMin || 0) &&
        cardArea <= (filter.areaMax || Infinity);
      const matchesPrice =
        cardPrice >= (filter.priceMin || 0) &&
        cardPrice <= (filter.priceMax || Infinity);
if (isNaN(cardArea) || isNaN(cardPrice)) {
  console.warn('Invalid area:', card.fartobi , 'or price:', card.fasi, );
}

      const checkboxFilters = [
        { key: 'airConditioning', field: 'kondincioneri' },
        { key: 'swimmingPool', field: 'sacurao_auzi' },
        { key: 'centralHeating', field: 'centraluri_gatboba' },
        { key: 'washer', field: 'samrecxao_otaxi' },
        { key: 'gym', field: 'sportuli_darbazi' },
        { key: 'alarm', field: 'signalizacia' },
        { key: 'tvCable', field: 'televizia_wifi' },
        { key: 'microwave', field: 'mikrotalguri' },

        { key: 'refrigerator', field: 'macivari' },
        { key: 'windowCovering', field: 'aivani' },
        { key: 'laundryRoom', field: 'samrecxio_otaxi' },
        // { key: 'outdoorShower', field: 'sacxovrebi' },
        { key: 'dryer', field: 'sagrdzelebi' },

        { key: 'garage', field: 'garaji' },
        { key: 'lifti', field: 'lifti' },
        { key: 'bolo_sartuli', field: 'bolo_sartuli' },
        { key: 'bunebrivi_airi', field: 'bunebrivi_airi' },
        { key: 'satavso', field: 'satavso' },
        { key: 'sardafi', field: 'sardafi' },
      ];

      const matchesCheckboxes = checkboxFilters.every(({ key, field }) => {
        
        return !filter[key] || card[field] === 'true';
      });

      return (
        matchesPropertyStatus &&
        matchesPropertyType &&
        matchesLocation &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesArea &&
        matchesPrice &&
        matchesCheckboxes
      );
    });
  }
}