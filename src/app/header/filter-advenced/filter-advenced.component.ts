import { Component } from '@angular/core';
import { AllCardsService } from '../../Services/all-cards/all-cards.service';
import { max, Subscription } from 'rxjs';
import { FilterDataUniterService } from '../../Services/filter-data-uniter/filter-data-uniter.service';
import { MainPageDataService } from '../../Services/mainPageService/main-page-data.service';

@Component({
  selector: 'app-filter-advenced',
  templateUrl: './filter-advenced.component.html',
  styleUrl: './filter-advenced.component.scss'
})
export class FilterAdvencedComponent {
  filterOptions = this.cardDataServ.filter;
  selectedValues: { [key: string]: any } = {}; // For select inputs
  checkboxStates: { [key: string]: boolean } = {}; // For checkboxes
  
  constructor(private cardDataServ: AllCardsService , private uniter:FilterDataUniterService , private dataService: MainPageDataService) {
    this.updateTrackColor_1();
    this.updateTrackColor_2();

  this.filterOptions.SelectInputs.forEach(sel => {
    this.selectedValues[sel.text] = sel.options[0];
  });
  
  }


  //double slider
 sliderOneValue_1 = 0;
 sliderTwoValue_1 = 20000;
 showSliderOne_1 = true;
 showSliderTwo_1 = true;
 trackStyle_1: { [key: string]: string };
 
 // Second wrapper slider properties
 sliderOneValue_2 = 0;
 sliderTwoValue_2 = 600000;
 showSliderOne_2 = true;
 showSliderTwo_2 = true;
 trackStyle_2: { [key: string]: string };
 
 minGap1 = 15;
 minGap2 = 5000;
 sliderMaxValue1 = 20000;
 sliderMaxValue2 = 600000;
activeimg=true;
private subscription: Subscription;
maxPeice
maxArea;


collectData() {
  return {
    selectInputs: Object.entries(this.selectedValues).map(([name, value]) => ({
      name,
      value: value || 'Not Selected',
    })),
    checkboxes: Object.entries(this.checkboxStates).map(([name, checked]) => ({
      name,
      checked,
    })),
    sliders: [
      { name: 'Area Size', min: this.sliderOneValue_1, max: this.sliderTwoValue_1 },
      { name: 'Price Range', min: this.sliderOneValue_2, max: this.sliderTwoValue_2 },
    ],
  };
}
onSubmit() {
  const formValue = this.cardDataServ.formValue; // From form
  const collectedData = this.collectData(); // From additional inputs

  // Merge the two objects
  const mergedData = {
    ...formValue,
    ...collectedData,
  };


  this.cardDataServ.formValue = mergedData;
  this.uniter.transferData(mergedData, 1)
  



}


ngOnInit() {
  this.subscription = this.cardDataServ.submit$.subscribe(() => {
    this.onSubmit();
  });

  this.cardDataServ.fetchDataFromApi().subscribe((data)=>{
 
const validPriceItems = data.filter(item =>
  typeof item.price === 'string' && /^\d+$/.test(item.price.replace(/\D/g, ''))
);

// Convert cleaned prices to numbers and find max, fallback to 500000
this.maxPeice = validPriceItems.length > 0
  ? Math.max(...validPriceItems.map(item => Number(item.price.replace(/\D/g, ''))))
  : 500000;

const areaValues = data
  .map(item => Number(item.area))
  .filter(val => !isNaN(val) && val > 0);

this.maxArea = areaValues.length > 0
  ? Math.max(...areaValues)
  : 50000;
    this.sliderTwoValue_1 = this.maxArea;
    this.sliderTwoValue_2 = this.maxPeice;
    this.sliderMaxValue2= this.maxPeice;
    this.sliderMaxValue1= this.maxArea;
})
}
ngOnDestroy() {
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
}
    advanced(){
this.dataService.toggleAdvanced();
    }
 // First wrapper slider methods
 slideOne_1(event: Event) {
   const target = event.target as HTMLInputElement;
   const newValue = parseInt(target.value);
   if (this.sliderTwoValue_1 - newValue <= this.minGap1) {
     this.sliderOneValue_1 = this.sliderTwoValue_1 - this.minGap1;
     target.value = this.sliderOneValue_1.toString();
   } else {
     this.sliderOneValue_1 = newValue;
   }
   this.showSliderOne_1 = this.sliderOneValue_1 < this.sliderTwoValue_1;
   this.updateTrackColor_1();
 }

 slideTwo_1(event: Event) {
   const target = event.target as HTMLInputElement;
   const newValue = parseInt(target.value);
   if (newValue - this.sliderOneValue_1 <= this.minGap1) {
     this.sliderTwoValue_1 = this.sliderOneValue_1 + this.minGap1;
     target.value = this.sliderTwoValue_1.toString();
   } else {
     this.sliderTwoValue_1 = newValue;
   }
   this.showSliderTwo_1 = this.sliderTwoValue_1 > this.sliderOneValue_1;
   this.updateTrackColor_1();
 }

 updateTrackColor_1() {
   const percent1 = (this.sliderOneValue_1 / this.sliderMaxValue1) * 100;
   const percent2 = (this.sliderTwoValue_1 / this.sliderMaxValue1) * 100;
   this.trackStyle_1 = {
     background: `linear-gradient(to right, #dadae5 ${percent1}%, #FF385C ${percent1}%, #FF385C ${percent2}%, #dadae5 ${percent2}%)`
   };
 }

 // Second wrapper slider methods
 slideOne_2(event: Event) {
   const target = event.target as HTMLInputElement;
   const newValue = parseInt(target.value);
   if (this.sliderTwoValue_2 - newValue <= this.minGap2) {
     this.sliderOneValue_2 = this.sliderTwoValue_2 - this.minGap2;
     target.value = this.sliderOneValue_2.toString();
   } else {
     this.sliderOneValue_2 = newValue;
   }
   this.showSliderOne_2 = this.sliderOneValue_2 < this.sliderTwoValue_2;
   this.updateTrackColor_2();
 }

 slideTwo_2(event: Event) {
   const target = event.target as HTMLInputElement;
   const newValue = parseInt(target.value);
   if (newValue - this.sliderOneValue_2 <= this.minGap2) {
     this.sliderTwoValue_2 = this.sliderOneValue_2 + this.minGap2;
     target.value = this.sliderTwoValue_2.toString();
   } else {
     this.sliderTwoValue_2 = newValue;
   }
   this.showSliderTwo_2 = this.sliderTwoValue_2 > this.sliderOneValue_2;
   this.updateTrackColor_2();
 }

 updateTrackColor_2() {
   const percent1 = (this.sliderOneValue_2 / this.sliderMaxValue2) * 100;
   const percent2 = (this.sliderTwoValue_2 / this.sliderMaxValue2) * 100;
   this.trackStyle_2 = {
     background: `linear-gradient(to right, #dadae5 ${percent1}%, #FF385C ${percent1}%, #FF385C ${percent2}%, #dadae5 ${percent2}%)`
   };
 }
 

}
