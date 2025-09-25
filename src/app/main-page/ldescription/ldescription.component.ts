import { Component, Input, OnInit, Signal } from '@angular/core';
import { LanguageChooserService } from '../../Services/language-chooser/language-chooser.service';

@Component({
  selector: 'app-ldescription',
  templateUrl: './ldescription.component.html',
  styleUrl: './ldescription.component.scss'
})
export class LDescriptionComponent implements OnInit {
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

   langdata=this.languageService.chosenLang;
   
  constructor(private languageService: LanguageChooserService) { } 

  

  ngOnInit(): void {  }
}
