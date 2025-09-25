import { Component, effect, Input } from '@angular/core';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';


@Component({
  selector: 'app-lprofile-card',
  templateUrl: './lprofile-card.component.html',
  styleUrl: './lprofile-card.component.scss'
})
export class LprofileCardComponent {
  @Input() agent!: {
    status: number;
    imgLink: string;
    Name: string;
    mainalt: string;
    maili: string;
    nomeri: string;
    sacxovrebeli_adgili: string;
    chems_shesaxeb: string;
    idi: string | number;
  };
    langdata=this.languageService.chosenLang.myProp;
    constructor( private languageService: LanguageChooserService ) { }

    ngOnInit(): void {
  
    }
    moveToCards(){
      const el = document.getElementById('List');
      console.log(el)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
      

}
