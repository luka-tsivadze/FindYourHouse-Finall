import { Component } from '@angular/core';
import { trigger, transition, style, animate} from '@angular/animations';
import { scale } from 'ol/transform';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('300ms ease', style({ 
          opacity: 0, 
          transform: 'translateZ(-200px) rotateY(30deg)' 
        }))
      ]),
      transition(':enter', [
        style({ 
          opacity: 0, 
    
          transform: 'translateZ(-200px) rotateY(30deg)' 
        }),
        animate('300ms ease', style({ 
          opacity: 1, 
         
          transform: 'none' 
        }))
      ])
    ]),
    trigger('fadeDelay', [
      transition(':enter', [
        style({ 
          opacity: 0, 
               scale: 0.6,
          transform: 'translateZ(-200px) rotateY(30deg)' 
        }),
        animate('300ms 300ms ease', style({ 
          opacity: 1, 
           scale: 1,
          transform: 'none' 
        }))
      ]),
      transition(':leave', [
        animate('300ms ease', style({ 
          opacity: 0, 
          transform: 'translateZ(-200px) rotateY(30deg)' 
        }))
      ])
    ]),
  ]
})
export class AddFormComponent {

  FormData = ['Shop', 'Building', 'Agaraki', 'Land', 'Commercial', 'Hotel'];

  selectIcons = ['../../../assets/Imges/StaticImg/StaticIcons/building.svg', '../../../assets/Imges/StaticImg/StaticIcons/icons8-home-16.png',
    '../../../assets/Imges/StaticImg/StaticIcons/Agaraki.svg', '../../../assets/Imges/StaticImg/StaticIcons/Land.svg',
    '../../../assets/Imges/StaticImg/StaticIcons/commercial.svg', '../../../assets/Imges/StaticImg/StaticIcons/Hotel.svg',]

  SelectedOption: any = { Icon: '../../../assets/Imges/StaticImg/StaticIcons/list-solid.svg', name: 'Name of Business' };
  showOptions = false;
chosen={
  imgLink:'../../../assets/Imges/StaticImg/StaticIcons/building.svg',
 list: [
  {
    name: `უძრავი ქონება `,
    Icon: `../../../assets/Imges/StaticImg/StaticIcons/building.svg`,
  }
]
}

  options = [{
    name: `უძრავი ქონება `,
    Icon: `../../../assets/Imges/StaticImg/StaticIcons/building.svg`,
    details:[{name:'აგენტი', Value:'agent'},{name:'სააგენტო', Value:'agency'}, {name:'სამშენებლო კომპანია', Value:'constructionCompany'}]

  },

  {
    name: `დასაქმება`,
    Icon: `../../../assets/Imges/StaticImg/StaticIcons/briefcase.svg`,
        details:[{name:'კომპანია', Value:'company'}]

  },
    {
    name: `მარკეტი`,
    Icon: `../../../assets/Imges/StaticImg/StaticIcons/shop.svg`,
      details:[{name:'მაღაზია', Value:'shop'}]

  },
  {
    name: `მომსახურება`,
    Icon: `../../../assets/Imges/StaticImg/StaticIcons/work.svg`,
        details:[{name:'კომპანია', Value:'company'}]
  }
  ,
  {
    name: `განათლება`,
    Icon: `../../../assets/Imges/StaticImg/StaticIcons/Graduation.svg`,
    details:[{name:'საგანმანათლებლო ცენტრი', Value:'EdCenter'},{name:'უნივერსიტეტი', Value:'university'}, {name:'პროფესიული სასწავლებელი', Value:'vocationalSchool'}]
  },
  {
    name: `ავტო`,
    Icon: `../../../assets/Imges/StaticImg/StaticIcons/car.svg`,
    details:[{name:'ავტოდილერი', Value:'CarDealer'},{name:'სადილერო კომპანია', Value:'dealerCompany'}, {name:'სალიზინგო კომპანია', Value:'leasingCompany'}]
  },
  {
    name: `ფინანსები`,
    Icon: `../../../assets/Imges/StaticImg/StaticIcons/cash-coin.svg`,
    details:[{name:'მიკროსაფინანსო ორგანიზაცია', Value:'micro'},{name:'ბანკი', Value:'bank'} ]
  }


]

  clickedIndex: number = -1;



  handleClick(option: any) {
    this.showOptions = !this.showOptions;
   this.chosen.list=option.details;
    this.chosen.imgLink=option.Icon;

  }
  handlechosenClick(index: number, option: any) {
console.log(option);
  }
}