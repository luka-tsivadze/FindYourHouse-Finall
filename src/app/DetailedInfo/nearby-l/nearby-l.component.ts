import { Component, OnInit } from '@angular/core';
import { PropertyInformationService } from '../../Services/Property-info/property-information.service';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';

@Component({
  selector: 'app-nearby-l',
  templateUrl: './nearby-l.component.html',
  styleUrl: './nearby-l.component.scss'
})
export class NearbyLComponent implements OnInit {
info:any;//maybe later will be translated
near="What's Nearby";
  constructor(private service:PropertyInformationService,private lang:LanguageChooserService) {
    this.near=this.lang.chosenLang.DetailedInfo.near;
   }

  ngOnInit(): void {
    this.service.chosenCard.subscribe((card) => {
      this.info = [
        {
          headerName: 'Education',
          class: 'first',
          imgLink: '../../../assets/Imges/CardDetailed/Icons/mortarboard-fill.svg', // Static info
          data: [
            { name: card.skolis_dasaxeleba_1, distance: card.skolis_distancia_1 + ' km' },
            { name: card.skolis_dasaxeleba_2, distance:  card.skolis_distancia_2 + ' km' },
            { name: card.skolis_dasaxeleba_3, distance:  card.skolis_distancia_3 + ' km' }
          ].filter(item => item.name !== null && item.distance !== null && item.name !== '' && item.distance !== '' )
        },
        {
          headerName: 'Health & Medical',
          class: 'second',
          imgLink: '../../../assets/Imges/CardDetailed/Icons/doctor-svgrepo-com.svg', // Static info
          data: [
            { name:  card.saavadmyofos_dasaxeleba_1, distance:  card.saavadmyofos_distancia_1 + ' km' },
            { name:  card.saavadmyofos_dasaxeleba_2, distance:  card.saavadmyofos_distancia_2 + ' km' },
            { name:  card.saavadmyofos_dasaxeleba_3, distance:  card.saavadmyofos_distancia_3 + ' km' }
          ].filter(item => item.name !== null && item.distance !== null && item.name !== '' && item.distance !== '' )
        },
        {
          headerName: 'Transportation',
          class: 'third',
          imgLink: '../../../assets/Imges/CardDetailed/Icons/car-front-fill.svg', // Static info
          data: [
            { name:  card.transportis_dasaxeleba_1, distance: card.transportis_distancia_1 + ' km' },
            { name:  card.transportis_dasaxeleba_2, distance:  card.transportis_distancia_2 + ' km' },
            { name: card.transportis_dasaxeleba_3, distance:  card.transportis_distancia_3 + ' km' }
          ].filter(item => item.name !== null && item.distance !== null && item.name !== '' && item.distance !== '' )
        }
      ];
      
      
    });
  }

  getStarArray(review: number): { filled: boolean }[] {
    return Array.from({ length: 5 }, (_, index) => ({ filled: index < review }));
  }

}
